import axios from 'axios';
// import { setAlert } from './alert';
import {
    GET_PROFILE,
    GET_PROFILES,
    GET_ONE_USER_PROFILE,
    EDIT_USER_AVATAR,
    PROFILE_ERROR
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