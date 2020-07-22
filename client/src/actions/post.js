import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS_BY_USER_ID,
    ADD_POST,
    DELETE_POST,
    CLEAR_POSTS,
    UPDATE_POST_CURRENT_PAGE,
    UPDATE_LIKES,
    GET_ONE_POST,
    UPDATE_COMMENT,
    POST_ERROR
} from './types';


export const getPostsByUserId = (userId) => async dispatch => {

    try {
        const res = await axios.get(`/api/posts/${userId}`);

        dispatch({
            type: GET_POSTS_BY_USER_ID,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
} 


// Add post
export const addPost = (formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete post
export const deletePost = (postId) => async dispatch => {

    try {
        await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId
        })

        dispatch(setAlert('Post Removed', 'success'));
    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Clear posts
export const clearPosts = () => dispatch => {

    try {
        dispatch({ type: CLEAR_POSTS });
    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Update Post Current Page
export const updatePostsCurrentPage = (pageNumber) => dispatch => {
    dispatch({ 
        type: UPDATE_POST_CURRENT_PAGE,
        payload: pageNumber
    });
}

// Like post
export const likePost = (postId) => async dispatch => {

    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}

// Like post
export const unlikePost = (postId) => async dispatch => {

    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}

// Get a single post
export const getOnePost = (postId) => async dispatch => {

    try {
        const res = await axios.get(`/api/posts/comment/${postId}`);

        dispatch({
            type: GET_ONE_POST,
            payload: res.data
        })

    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add comment
export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: UPDATE_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Comment Added', 'success'));

    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {

    try {
        const res = await axios.put(`/api/posts/comment/delete/${postId}/${commentId}`);

        dispatch({
            type: UPDATE_COMMENT,
            payload: res.data
        })

    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}