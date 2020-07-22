import { 
    UPDATE_ARTIST_CURRENT_PAGE,
    UPDATE_ARTIST_PER_PAGE,
    RESET_CURRENT_PAGE
} from '../actions/types';

const initialState = {
    artistCurrentPage: 1,
    artistPerPage: 9,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case UPDATE_ARTIST_CURRENT_PAGE:
        case RESET_CURRENT_PAGE:
            return {
                ...state,
                artistCurrentPage: payload,
            }
        case UPDATE_ARTIST_PER_PAGE:
            return {
                ...state,
                artistPerPage: payload
            }
        default:
            return state;
    }
}