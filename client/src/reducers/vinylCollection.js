import { 
    GET_ARTISTS,
    GET_ARTISTS_WITH_NO_ALBUMS,
    GET_ARTISTS_WITH_ALBUMS,
    GET_OTHER_USER_ARTIST_WITH_ALBUMS,
    GET_ONE_ARTIST,
    GET_ONE_ARTIST_FOR_SONGS,
    CLEAR_ONE_ARTIST,
    DELETE_ARTIST_AND_GET_ARTISTS,
    DELETE_ALBUM_AND_GET_ARTISTS,
    DELETE_SONG_AND_GET_ARTISTS,
    GET_OTHER_USER_ONE_ARTIST,
    CLEAR_OTHER_USER_ONE_ARTIST,
    CLEAR_VINYL_COLLECTION
} from "../actions/types";

const initialState = {
    artist: null,
    oneArtist: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_ARTISTS:
        case GET_ARTISTS_WITH_NO_ALBUMS:
        case GET_ARTISTS_WITH_ALBUMS:
        case GET_OTHER_USER_ARTIST_WITH_ALBUMS:
        case DELETE_ARTIST_AND_GET_ARTISTS:
        case DELETE_ALBUM_AND_GET_ARTISTS:
        case DELETE_SONG_AND_GET_ARTISTS:
            return {
                ...state,
                artist: payload,
                loading: false
            }
        
        case GET_ONE_ARTIST:
        case GET_ONE_ARTIST_FOR_SONGS:
        case GET_OTHER_USER_ONE_ARTIST:
            return {
                ...state,
                oneArtist: payload,
                loading: false
            }
        case CLEAR_VINYL_COLLECTION:
                return {
                    ...state,
                    artist: null,
                    oneArtist: null,
                    loading: true
                }
        case CLEAR_ONE_ARTIST:
        case CLEAR_OTHER_USER_ONE_ARTIST:
            return {
                ...state,
                oneArtist: null,
                loading: true
            }
        default:
            return state;
    }
}