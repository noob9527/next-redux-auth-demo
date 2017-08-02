import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '@/model';
import storage from '@/utils/storage';

export default (initialState, options) => {
    let middleware = null;
    if (typeof window === 'undefined') {
        middleware = applyMiddleware(thunkMiddleware);
    } else {
        middleware = compose(
            applyMiddleware(thunkMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),   //eslint-disable-line
        );
    }

    const store = createStore(
        rootReducer,
        getInitialState(initialState, options),
        middleware,
    );

    return store;
};

function getInitialState(initialState, options) {
    const { req } = options;
    if (!req) return initialState;
    // const user = storage.getUserFromCookie(req);
    // if (!token || !user) return initialState;
    const token = storage.getTokenFromCookie(req);
    if (!token) return initialState;

    return {
        ...initialState,
        auth: {
            token,
            isAuthenticated: !!token,
        },
        // user: {
        //     currentUser: user,
        // },
    };
}
