import React from 'react';
import PropTypes from 'prop-types';
import { withUser, userPropTypes } from '../Context/User';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is NOT authenticated. In case she is, call onLoggedIn callback.
 */
class LoggedOutRoute extends React.PureComponent {
  componentWillMount() {
    const { user, onLoggedIn } = this.props;

    // In case user IS logged in, fire onLoggedIn callback
    if (user && user.uuid) {
      onLoggedIn();
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevState, prevProps, snapshot) {
    const { user, onLoggedIn } = this.props;

    // In case user IS logged in, fire onLoggedIn callback
    if (user && user.uuid) {
      onLoggedIn();
    }
  }

  render() {
    const {
      user,
      component: Component,
      onLoggedIn,
      ...rest
    } = this.props;

    // ...Otherwise, render requested component
    return <Component {...rest} />;
  }
}

LoggedOutRoute.propTypes = {
  user: userPropTypes.user,
  component: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func,
};

LoggedOutRoute.defaultProps = {
  user: null,
  onLoggedIn: () => {},
};

export default withUser(LoggedOutRoute);


/*
import React from 'react';
import PropTypes from 'prop-types';
import { withUser, userPropTypes } from '../Context/User';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is NOT authenticated. In case she is, call onLoggedIn callback.
 //
const LoggedOutRoute = ({
  user,
  component: Component,
  onLoggedIn,
  ...rest
}) => {
  const childProps = { ...rest };

  // In case user IS logged in, render overlay component
  if (user && user.uuid) {
    onLoggedIn();
    return null;
  }

  // ...Otherwise, render requested component
  return <Component {...childProps} />;
};

LoggedOutRoute.propTypes = {
  user: userPropTypes.user,
  component: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func,
};

LoggedOutRoute.defaultProps = {
  user: null,
  onLoggedIn: () => {},
};

export default withUser(LoggedOutRoute);

*/
