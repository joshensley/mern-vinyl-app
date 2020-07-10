import axios from 'axios';
import { setAlert } from './alert';
import {
    ADD_GENRE,
    GET_GENRES,
    GET_OTHER_USER_GENRE,
    DELETE_GENRE_AND_GET_GENRES,
    // CLEAR_GENRES
} from './types';

// Get Genres
export const getGenre = () => async dispatch => {

    try {
        const res = await axios.get('/api/artist-genre');

        dispatch({
            type: GET_GENRES,
            payload: res.data
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }

}

// Get Other User Genre

export const getOtherUserGenre = (userId) => async dispatch => {

    try {
        const res = await axios.get(`/api/artist-genre/${userId}`);

        dispatch({
            type: GET_OTHER_USER_GENRE,
            payload: res.data
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Add Genre
export const addGenre = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/artist-genre', formData, config);

        dispatch({
            type: ADD_GENRE,
            payload: res.data.genreArray
        });

        const newGenre = res.data.genreArray[0].genre;

        dispatch(setAlert(`${newGenre} was added to Genre`, 'success'));

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Remove Genre
export const removeGenre = genreId => async dispatch => {

    try {
        const id = genreId.toString();
       
        const res = await axios.post(`/api/artist-genre/remove/${id}`);

        dispatch({
            type: DELETE_GENRE_AND_GET_GENRES,
            payload: res.data.genreArray
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}