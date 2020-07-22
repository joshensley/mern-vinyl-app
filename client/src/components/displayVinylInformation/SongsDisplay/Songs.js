import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    getSongs
} from '../../../actions/vinylCollection';

import {
    Container,
    Jumbotron,
    Table,
    CardImg,
    Col,
    Row,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';

const Songs = ({
    vinylCollection: { loading, oneArtist },
    getSongs,
    match
}) => {

    useEffect(() => {
        getSongs(
            match.params.userId, 
            match.params.artistId, 
            match.params.albumId
            );
    }, [getSongs, match])

    let album = ""
    if(!loading && oneArtist !== null) {
        album = oneArtist.albums
            .filter((album) => album._id === match.params.albumId )[0].songs
            .sort(function(a, b) {
                if (a.trackNumber < b.trackNumber) { return -1; }
                if (a.trackNumber > b.trackNumber) { return 1; }
                return 0
            })
            .map((song, index) => {
                return (
                    <Fragment key={index}>
                        <tr>
                            <th scope="row">{song.trackNumber}</th>
                            <td>{song.trackTitle}</td>
                            <td>{song.trackArtist}</td>
                        </tr>    
                    </Fragment>
                )
            })
    }

    let albumTitle = "";
    if(!loading && oneArtist !== null) {
        albumTitle = oneArtist.albums.filter((album) => album._id === match.params.albumId);
    }

    console.log(albumTitle);


    const albumCoverUrl = `/api/vinyl-collection/get-album-cover/${match.params.artistId}/${match.params.albumId}`

    return (
        <Container>
            <Jumbotron>
                    <h1 style={{textAlign:"center"}}>{albumTitle[0].title}</h1>
                    <Breadcrumb>    
                        <BreadcrumbItem>
                            <Link to={{ pathname: `/users` }}>Users</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to={{ pathname: `/artist/${oneArtist.user}` }}>Artists</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            <Link to={{ pathname: `/albums/${match.params.userId}/${match.params.artistId}` }}>Artists</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Songs
                        </BreadcrumbItem>
                    </Breadcrumb>
                
                    <Row>
                        <Col xs="12" sm="12" md="12" lg="6" xl="6" style={{verticalAlign:"middle"}}>
                            <CardImg style={{
                                display:"block", 
                                marginLeft:"auto", 
                                marginRight:"auto",
                                width:"50%"
                                }} 
                                src={albumCoverUrl} 
                                alt="Card image" 
                            />  
                            <br/>
                        </Col> 
                        <Col xs="12" sm="12" md="12" lg="6" xl="6">
                            <Table style={{ textAlign: "center" }} size="sm" striped dark hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Artist</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {album}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
            </Jumbotron>
        </Container>
    )
}

Songs.propTypes ={
    getSongs: PropTypes.func.isRequired,
    vinylCollection: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    vinylCollection: state.vinylCollection
})

export default connect(mapStateToProps, { getSongs })(Songs);