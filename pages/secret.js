import React from 'react';
import Link from 'next/link';
import { compose, bindActionCreators } from 'redux';

import withRedux from '@/utils/withRedux';
import auth from '@/components/hoc/auth';
import { logout, logoutSuccess } from '@/model/auth';

const Secret = () => (
  <div>
        Welcome to next.js!
        <Link href="/"><a>home</a></Link>
  </div>
);

export default compose(
    withRedux(mapStateToProps, mapDispatchToProps),
    auth({ strategy: 'isAuthenticated' }),
)(Secret);

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
        logoutSuccess: bindActionCreators(logoutSuccess, dispatch),
    };
}
