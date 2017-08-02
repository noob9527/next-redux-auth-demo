import Auth0Lock from 'auth0-lock';
import constant from '@/config/constant';

const { AUTH0 } = constant;

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`;

function getLock(options) {
    return new Auth0Lock(
        AUTH0.AUTH0_CLIENT_ID,
        AUTH0.AUTH0_CLIENT_DOMAIN,
        options,
    );
}

function getOptions(container) {
    return {
        container,
        closable: false,
        auth: {
            responseType: 'token',
            redirectUrl: `${getBaseUrl()}/auth/loginSuccess`,
            params: {
                scope: 'openid profile email',
            },
        },
    };
}

export const show = container => getLock(getOptions(container)).show();
