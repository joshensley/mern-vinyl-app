import { 
    UPDATE_ARTIST_CURRENT_PAGE,
    UPDATE_ARTIST_PER_PAGE,
    RESET_CURRENT_PAGE
} from '../actions/types';


export const updateArtistCurrentPage = (pageNumber) => dispatch => {

    dispatch({
        type: UPDATE_ARTIST_CURRENT_PAGE,
        payload: pageNumber
    })
}

export const updateArtistPerPage = (artistPerPage) => dispatch => {

    dispatch({
        type: UPDATE_ARTIST_PER_PAGE,
        payload: artistPerPage
    })
}

export const resetCurrentPage = () => dispatch => {
    dispatch({
        type: RESET_CURRENT_PAGE,
        payload: 1
    })
}

