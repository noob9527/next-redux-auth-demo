import React from 'react';
import Link from 'next/link';
import { compose, bindActionCreators } from 'redux';

import withRedux from '@/utils/withRedux';
import auth from '@/components/hoc/auth';
import { logout, logoutSuccess } from '@/model/auth';

const Index = ({ isAuthenticated, logout }) => (
  <div>
        Welcome to next.js!
        <div>
          {`isAuthenticated: ${isAuthenticated}`}
        </div>
    <div>
      <Link href="/secret"><a>go to secret page</a></Link>
    </div>
    <div>
      <Link href="/auth/login"><a>go to auth0 login page</a></Link>
    </div>
    {
      <div>
        <button onClick={logout} disabled={!isAuthenticated}>logout</button>
      </div>
    }
  </div>
    );

export default compose(
    withRedux(mapStateToProps, mapDispatchToProps),
    auth('permitAll'),
)(Index);

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
