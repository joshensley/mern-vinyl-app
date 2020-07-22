import { 
    GET_PROFILE,
    GET_PROFILES,
    GET_ONE_USER_PROFILE,
    EDIT_USER_AVATAR,
    PROFILE_ERROR, 
    CLEAR_PROFILE,
    UPDATE_PROFILE_CURRENT_PAGE,
    RESET_PROFILE_PAGE,
    SEARCH_PROFILE,
    RESET_SEARCH_PROFILE
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    profilesCurrentPage: 1,
    profilesPerPage: 9,
    profilesSearch: "",
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
        case UPDATE_PROFILE_CURRENT_PAGE:
        case RESET_PROFILE_PAGE:
            return {
                ...state,
                profilesCurrentPage: payload
            }
        case SEARCH_PROFILE:
            return {
                ...state,
                profilesSearch: payload
            }
        case RESET_SEARCH_PROFILE:
            return {
                ...state,
                profilesSearch: "",
                profilesCurrentPage: 1
            }
        default:
            return state;
    }
};