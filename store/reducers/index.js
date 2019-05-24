import { combineReducers } from 'redux';

import itemReducer from './itemReducer';
import navReducer from './navReducer';

export default combineReducers({
    itemReducer,
    navReducer
});
