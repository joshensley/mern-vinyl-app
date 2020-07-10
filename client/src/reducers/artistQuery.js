import {
    CHANGE_GENRE,
    CLEAR_GENRE,
    SORT_ARTIST,
    BEGINS_WITH,
    CLEAR_BEGINS_WITH,
    SEARCH_ARTIST,
    CLEAR_SEARCH_ARTIST
} from '../actions/types';

const initialState = {
    genre: "",
    sort: "mostAlbums",
    beginsWith: "All",
    searchArtist: "",
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case CHANGE_GENRE:
        case CLEAR_GENRE:
            return {
                ...state,
                genre: payload
            }
        case SORT_ARTIST:
            return {
                ...state,
                sort: payload
            }
        case BEGINS_WITH:
        case CLEAR_BEGINS_WITH:
            return {
                ...state,
                beginsWith: payload
            }
        case SEARCH_ARTIST:
        case CLEAR_SEARCH_ARTIST:
            return {
                ...state,
                searchArtist: payload
            }
        default:
            return state;
    }
}