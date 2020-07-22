import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    GET_PROFILES,
    GET_ONE_USER_PROFILE,
    EDIT_USER_AVATAR,
    PROFILE_ERROR,
    UPDATE_PROFILE_CURRENT_PAGE,
    RESET_CURRENT_PAGE,
    SEARCH_PROFILE,
    RESET_SEARCH_PROFILE
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}

// Get all profiles
export const getAllProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            // payload: { 
            //     msg: err.response.statusText, 
            //     status: err.response.status 
            // }
        })
    }
}

// Get one user profile
export const getOneUserProfile = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/${userId}`)

        dispatch({
            type: GET_ONE_USER_PROFILE,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit) {
            history.push('/dashboard');
        }

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
} 

// Edit user avatar
export const editUserAvatar = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    try {
        const res = await axios.put('/api/users/edit-user-avatar', formData, config);
        dispatch({
            type: EDIT_USER_AVATAR,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}


export const updateProfileCurrentPage = (pageNumber) => dispatch => {

    try {
        dispatch({
            type: UPDATE_PROFILE_CURRENT_PAGE,
            payload: pageNumber
        })
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}

// Text search on profile
export const searchProfile = (word) => dispatch => {

    try {

        dispatch({
            type: SEARCH_PROFILE,
            payload: word
        })
        
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        })
    }
}

export const resetSearchProfile = () => dispatch => {
    dispatch({
        type: RESET_SEARCH_PROFILE
    })
}

export const resetCurrentPage = () => dispatch => {
    dispatch({
        type: RESET_CURRENT_PAGE,
        payload: 1
    })
}