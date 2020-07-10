import axios from 'axios';
import { setAlert } from './alert';

import { 
    GET_ARTISTS,
    GET_ARTISTS_WITH_NO_ALBUMS,
    GET_ARTISTS_WITH_ALBUMS,
    GET_OTHER_USER_ARTIST_WITH_ALBUMS,
    GET_ONE_ARTIST,
    GET_ONE_ARTIST_FOR_SONGS,
    GET_OTHER_USER_ONE_ARTIST,
    CLEAR_ONE_ARTIST,
    CLEAR_OTHER_USER_ONE_ARTIST,
    DELETE_ARTIST_AND_GET_ARTISTS,
    DELETE_ALBUM_AND_GET_ARTISTS,
    DELETE_SONG_AND_GET_ARTISTS,
    CLEAR_VINYL_COLLECTION
} from '../actions/types';

// Get Artist
export const getArtists = () => async dispatch => {

    try {
        const res = await axios.get('/api/vinyl-collection/artist');

        dispatch({
            type: GET_ARTISTS,
            payload: res.data
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Clear Vinyl Collection
export const clearVinylCollection = () => async dispatch => {
     
    try {
        dispatch({
            type: CLEAR_VINYL_COLLECTION
        })
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Get Artists With No Albums
export const getArtistsWithNoAlbums = () => async dispatch => {

    try {
        const res = await axios.get('/api/vinyl-collection/artist/no-albums');

        dispatch({
            type: GET_ARTISTS_WITH_NO_ALBUMS,
            payload: res.data
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Get Artists With Albums
export const getArtistsWithAlbums = () => async dispatch => {

    try {
        const res = await axios.get('/api/vinyl-collection/artist/with-albums');

        dispatch({
            type: GET_ARTISTS_WITH_ALBUMS,
            payload: res.data
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Get Other User Artist With Albums
export const getOtherUserArtistWithAlbums = (userId) => async dispatch => {

    try {
        const res = await axios.get(`/api/vinyl-collection/other-user-artist-with-albums/${userId}`);

        dispatch({
            type: GET_OTHER_USER_ARTIST_WITH_ALBUMS,
            payload: res.data
        });

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}


// Get One Artist
export const getOneArtist = (artistId) => async dispatch => {

    try {
        const res = await axios.get(`/api/vinyl-collection/artist/${artistId}`);

        dispatch({
            type: GET_ONE_ARTIST,
            payload: res.data
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const getOtherUserOneArtist = (userId, artistId) => async dispatch => {

    try {
        const res = await axios.get(`/api/vinyl-collection/other-user-artist/${userId}/${artistId}`)

        dispatch({
            type: GET_OTHER_USER_ONE_ARTIST,
            payload: res.data
        })
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        } 
    }
}

export const clearOtherUserOneArtist = () => async dispatch => {
    
    try {
        dispatch({ type: CLEAR_OTHER_USER_ONE_ARTIST })
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Clear One Artist
export const clearOneArtist = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_ONE_ARTIST
        })
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Add Artist
export const addArtist = formData => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/vinyl-collection/artist', formData, config);

        dispatch(setAlert(`${res.data.artist} was added to the ${res.data.genre} genre`))

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Delete Artist
export const deleteArtist = artistId => async dispatch => {

    try {
        await axios.delete(`/api/vinyl-collection/artist/delete/${artistId}`);

        const res = await axios.get('/api/vinyl-collection/artist/no-albums');

        dispatch({
            type: DELETE_ARTIST_AND_GET_ARTISTS,
            payload: res.data
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }

}

// Add Album
export const addAlbum = (formData, multipartFormData) => async dispatch => {

    try {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/vinyl-collection/albums', formData, config);

        const artistId = res.data._id.toString();
        const artist = res.data.artist;
        const albumId = res.data.albums[0]._id.toString();
        const album = res.data.albums[0].title;
        const releaseYear = res.data.albums[0].releaseYear;

        config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        await axios.post(`/api/vinyl-collection/album-cover/${artistId}/${albumId}`, multipartFormData, config);

        dispatch(setAlert(`${album} (${releaseYear}) was added to ${artist}`))

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Delete Artist
export const deleteAlbum = (artistId, albumId) => async dispatch => {

    try {
        await axios.post(`/api/vinyl-collection/artist/${artistId}/albums/${albumId}/remove`);

        const res = await axios.get('/api/vinyl-collection/artist/with-albums')

        dispatch({
            type: DELETE_ALBUM_AND_GET_ARTISTS,
            payload: res.data
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }

}

// Add Songs
export const addSongs = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        await axios.put('/api/vinyl-collection/songs', formData, config);
        dispatch(setAlert('Songs were added', 'success'));

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Get Album Songs
export const getSongs = (userId, artistId, albumId ) => async dispatch => {

    try {
        const res = await axios.get(`/api/vinyl-collection/songs/${userId}/${artistId}/${albumId}`);

        dispatch({
            type: GET_ONE_ARTIST_FOR_SONGS,
            payload: res.data
        })
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Delete Song
export const deleteSong = (artistId, albumId, songId) => async dispatch => {

    try {
        await axios.post(`/api/vinyl-collection/artist/${artistId}/albums/${albumId}/song/${songId}/remove`);

        const res = await axios.get('/api/vinyl-collection/artist/with-albums')

        dispatch({
            type: DELETE_SONG_AND_GET_ARTISTS,
            payload: res.data
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }

}