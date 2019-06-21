import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { withUser, userPropTypes } from '../Context/User';
import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is NOT authenticated. In case she is, call onLoggedIn callback.
 */
class LoggedOutRoute extends React.PureComponent {
  isLoggedIn = (props) => {
    const {
      loadingUser,
      user,
    } = props;

    return !loadingUser && user && user.uuid;
  }

  componentWillMount() {
    const { onLoggedIn, ...rest } = this.props;
    if (this.isLoggedIn(rest)) {
      onLoggedIn();
    }
  }

  componentWillUpdate(nextProps) {
    const { onLoggedIn, ...rest } = nextProps;
    if (this.isLoggedIn(rest)) {
      onLoggedIn();
    }
  }

  render() {
    const {
      loadingUser,
      user,
      component: Component,
      onLoggedIn,
      ...rest
    } = this.props;

    // Wait until user is ready
    if (loadingUser) {
      return <CenteredActivityIndicator />;
    }

    // In case user IS logged in, render overlay component
    if (user && user.uuid) {
      return <CenteredActivityIndicator />;
    }

    // ...Otherwise, render requested component
    return <Component {...rest} />;
  }
}

LoggedOutRoute.propTypes = {
  loadingUser: userPropTypes.loadingUser.isRequired,
  user: userPropTypes.user,
  component: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func,
};

LoggedOutRoute.defaultProps = {
  user: null,
  onLoggedIn: () => {},
};

const enhance = compose(
  withUser,
);

export default enhance(LoggedOutRoute);
