import { 
    GET_PROFILE,
    GET_PROFILES,
    GET_ONE_USER_PROFILE,
    EDIT_USER_AVATAR,
    PROFILE_ERROR, 
    CLEAR_PROFILE 
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    oneProfile: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case GET_PROFILE:
        case EDIT_USER_AVATAR:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_ONE_USER_PROFILE:
            return {
                ...state,
                oneProfile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        default:
            return state;
    }
};