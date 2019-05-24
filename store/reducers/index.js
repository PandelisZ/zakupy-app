import { combineReducers } from 'redux';

import itemReducer from './itemReducer';
import navReducer from './navReducer';
import listReducer from './listReducer';

export default combineReducers({
    itemReducer,
    navReducer,
    listReducer
});
