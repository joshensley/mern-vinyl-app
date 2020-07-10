import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import genre from './genre';
import vinylCollection from './vinylCollection';
import artistPagination from './artistPagination';
import artistQuery from './artistQuery';

export default combineReducers({
    alert,
    auth,
    genre,
    profile,
    vinylCollection,
    artistPagination,
    artistQuery
});