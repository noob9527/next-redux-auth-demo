import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

export default {
    setToken,
    removeToken,
    getTokenFromCookie,
    getTokenFromLocalStorage,
    getUserFromCookie,
    getUserFromLocalStorage,
    extractInfoFromUrl,
};

function extractInfoFromUrl() {
    if (!process.browser) return null;

    const obj = getQueryParams();
    return { token: obj.id_token };

    function getQueryParams() {
        const params = {};
        window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
            params[$1] = $3;
        });
        return params;
    }
}

function getTokenFromCookie(req) {
    if (!req.headers.cookie) {
        return undefined;
    }
    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
    if (!jwtCookie) {
        return undefined;
    }
    return jwtCookie.split('=')[1];
}

function getTokenFromLocalStorage() {
    return window.localStorage.getItem('token');
}

function getUserFromCookie(req) {
    return jwtDecode(getTokenFromCookie(req));
}

function getUserFromLocalStorage() {
    return window.localStorage.getItem('user');
}

function setToken(token) {
    if (!process.browser) return;
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)));
    Cookie.set('jwt', token);
}

function removeToken() {
    if (!process.browser) return;
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('secret');
    Cookie.remove('jwt');

    window.localStorage.setItem('logout', Date.now());
}
