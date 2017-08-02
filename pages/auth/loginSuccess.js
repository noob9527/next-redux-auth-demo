import React from 'react';
import Router from 'next/router';
import { bindActionCreators } from 'redux';

import withRedux from '@/utils/withRedux';
import storage from '@/utils/storage';
import { loginWithJWT } from '@/model/auth';

class LoginSuccess extends React.Component {
    componentDidMount() {
        const { loginWithJWT } = this.props;
        const { token } = storage.extractInfoFromUrl();
        if (!token) {
            console.error('Something happened with the Sign In request');
        }
        loginWithJWT(token);
        Router.push('/');
    }

    render() {
        return null;
    }
}

export default withRedux(null, mapDispathToProps)(LoginSuccess);

function mapDispathToProps(dispatch) {
    return {
        loginWithJWT: bindActionCreators(loginWithJWT, dispatch),
    };
}
