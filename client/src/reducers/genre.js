import { 
    ADD_GENRE, 
    GET_OTHER_USER_GENRE,
    GET_GENRES, 
    DELETE_GENRE_AND_GET_GENRES
} from "../actions/types";

const initialState = {
    genre: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_GENRES:
        case GET_OTHER_USER_GENRE:
        case ADD_GENRE:
        case DELETE_GENRE_AND_GET_GENRES:
            return {
                ...state,
                genre: payload,
                loading: false
            }
        default:
            return state;
    }
}