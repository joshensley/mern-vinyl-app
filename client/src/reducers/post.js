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
} from '../actions/types';

const initialState = {
    posts: [],
    postsCurrentPage: 1,
    postsPerPage: 5,
    post: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_POSTS_BY_USER_ID:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case CLEAR_POSTS:
            return {
                ...state,
                posts: [],
                post: null,
                loading: true,
                error: {}
            }
        case UPDATE_POST_CURRENT_PAGE:
            return {
                ...state,
                postsCurrentPage: payload
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => 
                    post._id === payload.postId ?  { ...post, likes: payload.likes } : post
                ),
                loading: false
            }

        case GET_ONE_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        
        default:
            return state;
    }
}