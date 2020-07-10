import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    getSongs
} from '../../../actions/vinylCollection';

import {
    Container,
    Jumbotron,
    Table,
    CardImg
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

    const albumCoverUrl = `/api/vinyl-collection/get-album-cover/${match.params.artistId}/${match.params.albumId}`

    return (
        <Container>
            <Jumbotron>
                <CardImg style={{width:"25%"}} src={albumCoverUrl} alt="Card image" />
                <Table style={{textAlign:"center"}} size="sm" striped dark hover>
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