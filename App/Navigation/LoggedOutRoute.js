import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { withUser, userPropTypes } from '../Context/User';
import { withLocation, locationPropTypes } from '../Context/Location';
import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is NOT authenticated. In case she is, call onLoggedIn callback.
 */
const LoggedOutRoute = ({
  loadingUser,
  user,
  loadingLocation,
  location,
  component: Component,
  onLoggedIn,
  ...rest
}) => {
  const childProps = { ...rest };

  // Wait until user is ready
  if (loadingUser || loadingLocation) {
    return <CenteredActivityIndicator />;
  }

  // In case user IS logged in, render overlay component
  if (user && user.uuid) {
    onLoggedIn({ location });
    return null;
  }

  // ...Otherwise, render requested component
  return <Component {...childProps} />;
};

LoggedOutRoute.propTypes = {
  loadingUser: userPropTypes.loadingUser.isRequired,
  user: userPropTypes.user,
  loadingLocation: locationPropTypes.loadingLocation.isRequired,
  location: locationPropTypes.location,
  component: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func,
};

LoggedOutRoute.defaultProps = {
  user: null,
  location: null,
  onLoggedIn: () => {},
};

const enhance = compose(
  withUser,
  withLocation,
);

export default enhance(LoggedOutRoute);
