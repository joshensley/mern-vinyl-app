import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    getOtherUserGenre
} from '../../../actions/genre';
import { 
    getOtherUserArtistWithAlbums,
    clearOtherUserOneArtist 
} from '../../../actions/vinylCollection';
import {
    getOneUserProfile
} from '../../../actions/profile';
import ArtistCard from './ArtistCard';
import ArtistPagination from './ArtistPagination';
import ArtistFilter from './filters/ArtistFilter';

import {
    Row,
    Col,
    Container,
    Jumbotron,
    Spinner,
    Card,
    CardBody,
    CardImg,
    CardTitle
} from 'reactstrap';

const Artist = ({
    getOtherUserGenre,
    clearOtherUserOneArtist,
    getOneUserProfile,
    getOtherUserArtistWithAlbums,
    vinylCollection: { loading, artist },
    profile: { oneProfile },
    artistPagination: {  
        artistCurrentPage, 
        artistPerPage 
    },
    artistQuery: {
        genre,
        sort,
        beginsWith,
        searchArtist
    },
    match
    
}) => {

    useEffect(() => {
        clearOtherUserOneArtist();
        getOtherUserGenre(match.params.id);
        getOneUserProfile(match.params.id);
        getOtherUserArtistWithAlbums(match.params.id);

    }, [
        getOtherUserGenre,
        getOtherUserArtistWithAlbums, 
        getOneUserProfile,
        clearOtherUserOneArtist, 
        match
    ]);

    let userName = ""
    if( !loading && oneProfile !== null) {
        userName = oneProfile.user.name;
    }

    
    const indexOfLastArtist = artistCurrentPage * artistPerPage;
    const indexOfFirstArtist = indexOfLastArtist - artistPerPage;
    let currentArtist = "";
    if(!loading && artist !== null) {

        // Filters genre
        if (genre !== "") {
            artist = artist.filter( artist => artist.genre === genre );
        }

        if (beginsWith !== "All") {
            artist = artist.filter( artist => artist.artist[0].toUpperCase() === beginsWith);
        }

        // Searches the artist
        if (searchArtist !== "") {
            let searchArtistLowerCase = searchArtist.toLowerCase();
            artist = artist.filter( artist => {
                let artistLowerCase = artist.artist.toLowerCase();
                return  artistLowerCase.indexOf(searchArtistLowerCase) > -1

            })  
        }


        // Sorts artist
        if (sort === "mostAlbums") {
            artist.sort(function(a, b) {
                return b.albums.length - a.albums.length
            })

        } else if( sort === "AZ") {
            artist.sort(function(a, b) {
                if(a.artist < b.artist) { return -1 }
                if(a.artist > b.artist) { return 1 }
                return 0
            })
        } else if ( sort === "ZA" ) {
            artist.sort(function(a, b) {
                if(a.artist > b.artist) { return -1 }
                if(a.artist < b.artist) { return 1 }
                return 0
            })
        }

        // Pagination
        currentArtist = artist.slice(indexOfFirstArtist, indexOfLastArtist);
        
    }

    let photoUrl = "";
    if(oneProfile) {
        photoUrl = oneProfile.user._id ? `/api/users/${oneProfile.user._id}` : "";
    }

    return (
        <div>
        <Container className="mt-3">
            <br/>

            {
                !loading ? 
                <Card body inverse style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}>
                    <br />
                    <div style={{textAlign:"center"}}>
                        <CardImg 
                            top
                            src={photoUrl}
                            style={{
                                height: "100px",
                                width: "100px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                margin: "0",
                                display: "inline-block"
                            }}
                        />
                    </div>

                    <CardBody>
                        <CardTitle style={{textAlign:"center", fontSize:"30px"}}>{userName}</CardTitle>
                    </CardBody>

                    <ArtistFilter />

                </Card> : <div style={{textAlign:"center"}}><Spinner /></div>
            }     
        </Container>

        <Container className="mt-3">
            <Jumbotron>
                {
                    !loading && artist !== null ? 
                    <Fragment>

                        {/* <div className="mt-1">
                            <ArtistFilter />
                        </div> */}
                    
                        <ArtistPagination  artistFilter={artist} />
                        <Row>
                            { 
                                !loading && artist !== null ? currentArtist
                                    .map((artistMap, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Col md={{size: 4}}>
                                                <ArtistCard artistMap={artistMap} />
                                                <br/>
                                            </Col>
                                        </Fragment>
                                    )
                                }) : <Spinner />
                            }
                        </Row>
                        <ArtistPagination artistFilter={artist} />
                    </Fragment> : <div style={{textAlign:"center"}}><Spinner /></div>
                }

                
            </Jumbotron>
        </Container>
        </div>
    )
}


Artist.propTypes = {
    getOtherUserGenre: PropTypes.func.isRequired,
    getOtherUserArtistWithAlbums: PropTypes.func.isRequired,
    getOneUserProfile: PropTypes.func.isRequired,
    clearOtherUserOneArtist: PropTypes.func.isRequired,
    vinylCollection: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    artistPagination: PropTypes.object.isRequired,
    artistQuery: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    vinylCollection: state.vinylCollection,
    profile: state.profile,
    artistPagination: state.artistPagination,
    artistQuery: state.artistQuery
})

export default connect(mapStateToProps, { 
    getOtherUserGenre,
    getOtherUserArtistWithAlbums,
    getOneUserProfile,
    clearOtherUserOneArtist
})(Artist);