import { combineReducers } from 'redux';

import auth from '@/model/auth';

const rootReducer = combineReducers({
    auth,
});

export default rootReducer;
