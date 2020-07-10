import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    getOtherUserOneArtist
} from '../../../actions/vinylCollection';
import AlbumsCard from './AlbumsCard';

import {
    Row,
    Col,
    Container,
    Jumbotron,
    Spinner,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';

const Albums = ({
    getOtherUserOneArtist, 
    vinylCollection: {loading, oneArtist}, 
    match 
}) => {

    useEffect(() => {
        getOtherUserOneArtist(match.params.userId, match.params.artistId);
    }, [getOtherUserOneArtist, match])

    let { _id, user, artist } = "";
    if (oneArtist) {
        _id = oneArtist._id;
        user = oneArtist.user;
        artist = oneArtist.artist;
        
        // sorts by release year
        oneArtist.albums.sort(function(a, b) {
            if(a.releaseYear < b.releaseYear) { return -1 }
            if(a.releaseYear > b.releaseYear) { return 1 }
            return 0
    
        })
    }

    
    
    return (
        <Container>
            <Jumbotron>
                <h1 style={{fontSize:"50px", textAlign:"center"}}>
                    {artist}
                </h1>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to={{ pathname: `/users` }}>Users</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={{ pathname: `/artist/${user}` }}>Artists</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        Albums
                    </BreadcrumbItem>
                </Breadcrumb>
                <Row>
                    { 
                    
                    !loading && oneArtist !== null ? oneArtist.albums.map((albumsMap, index) => {
                        return (
                            <Fragment key={index}>
                                <Col md={{size: 4}}>
                                    <AlbumsCard
                                        artistId={match.params.artistId}
                                        _id={_id}
                                        user={user}
                                        albumsMap={albumsMap}
                                    />
                                    <br/>
                                </Col>
                            </Fragment>

                        )
                    }) : <Spinner />
                }
                    
                </Row>
            </Jumbotron>
        </Container>
    )
}

Albums.propTypes = {
    getOtherUserOneArtist: PropTypes.func.isRequired,
    vinylCollection: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    vinylCollection: state.vinylCollection
})

export default connect(mapStateToProps, { getOtherUserOneArtist })(Albums);