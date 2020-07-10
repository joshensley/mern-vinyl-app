import {
    CHANGE_GENRE,
    CLEAR_GENRE,
    SORT_ARTIST,
    BEGINS_WITH,
    CLEAR_BEGINS_WITH,
    SEARCH_ARTIST,
    CLEAR_SEARCH_ARTIST
} from './types';
import { setAlert } from './alert';

// Change genre query
export const changeGenre = (genre) => dispatch => {

    try {

        dispatch({
            type: CHANGE_GENRE,
            payload: genre
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

    }
}

// Clear genre query
export const clearGenre = () => dispatch => {

    try {
        dispatch({
            type: CLEAR_GENRE,
            payload: ""
        })
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

    }
}

// Sort artist
export const sortArtist = (sort) => dispatch => {

    try {

        dispatch({
            type: SORT_ARTIST,
            payload: sort
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

    }
}

// Artist name begins with
export const beginsWith = (letter) => dispatch => {

    try{

        dispatch({
            type: BEGINS_WITH,
            payload: letter
        })

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Clear name begins with
export const clearBeginsWith = () => dispatch => {

    try {
        dispatch({
            type: CLEAR_BEGINS_WITH,
            payload: "All"
        })
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

// Text search on artist
export const searchArtist = (word) => dispatch => {

    try {

        dispatch({
            type: SEARCH_ARTIST,
            payload: word
        })
        
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const clearSearchArtist = () => dispatch => {

    try {
        dispatch({
            type: CLEAR_SEARCH_ARTIST,
            payload: ""
        })
    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}