import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

export const ISAUTHENTICATED = 'isAuthenticated';
export const PERMITALL = 'permitAll';

const defaultOpt = {
    strategy: ISAUTHENTICATED,
};

export default (opts = defaultOpt) => {
    const option = typeof opts === 'string'
        ? { strategy: opts }
        : opts;

    return Page => class PageWithAuth extends React.Component {
        static getInitialProps(ctx) {
            const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);
            return {
                ...pageProps,
            };
        }

        static propTypes = {
            isAuthenticated: PropTypes.bool.isRequired,
            logoutSuccess: PropTypes.func.isRequired,
            logout: PropTypes.func.isRequired, // eslint-disable-line
        }

        componentDidMount() {
            window.addEventListener('storage', this.logoutHandler, false);
        }

        componentWillUnmount() {
            window.removeEventListener('storage', this.logoutHandler, false);
        }

        logoutHandler = (event) => {
            if (event.key === 'logout') {
                this.props.logoutSuccess();
                Router.push('/');
            }
        }

        render() {
            if (option.strategy !== PERMITALL && !this.props.isAuthenticated) {
                return <div>must login first</div>;
            }
            return (
              <Page {...this.props} />
            );
        }

};
};
