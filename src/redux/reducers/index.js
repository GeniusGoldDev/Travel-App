import {combineReducers} from 'redux';
import LoadingReducer from './Loading';
import AuthReducer from './Auth';
import HomeReducer from './Home';
import SearchReducer from './Search';
import {loader} from './HOCreducers';


export default combineReducers({
    auth: AuthReducer,
    loading: LoadingReducer,
    home: HomeReducer,
    search: SearchReducer,
    loader
});
