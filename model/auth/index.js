import storage from '@/utils/storage';

const actions = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_ERROR: 'LOGOUT_ERROR',
};

export function loginWithJWT(token) {
    return (dispatch) => {
        storage.setToken(token);
        dispatch({
            type: actions.LOGIN_SUCCESS,
            payload: { token },
        });
    };
}

export function logout() {
    return (dispatch) => {
        storage.removeToken();
        dispatch(logoutSuccess());
    };
}

export function logoutSuccess() {
    return {
        type: actions.LOGOUT_SUCCESS,
    };
}

const initialState = {
    token: null,
    isAuthenticated: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actions.LOGIN_SUCCESS:
        return {
            ...state,
            isAuthenticated: true,
            token: action.payload.token,
        };
    case actions.LOGOUT_SUCCESS:
        return {
            ...state,
            isAuthenticated: false,
            token: null,
        };
    default:
        return state;
    }
};
