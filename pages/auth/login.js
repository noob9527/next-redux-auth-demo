import React from 'react';

import withRedux from '@/utils/withRedux';
import { show } from '@/utils/auth0Lock';

const CONTAINER_ID = 'lock-container';

class Login extends React.Component {

    componentDidMount() {
        show(CONTAINER_ID);
    }

    render() {
        return <div id={CONTAINER_ID} />;
    }
}

export default withRedux()(Login);
