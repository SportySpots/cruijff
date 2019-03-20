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
 * is authenticated. If not, the LoggedInRoute component renders the given
 * overlay component on top of the current route.
 */
const LoggedInRoute = ({
  loadingUser,
  user,
  loadingLocation,
  component: Component,
  overlay: Overlay,
  ...rest
}) => {
  const childProps = { ...rest };

  // Wait until user is ready
  if (loadingUser || loadingLocation) {
    return <CenteredActivityIndicator />;
  }

  // In case user is NOT logged in, render overlay component
  if (!user) {
    return <Overlay {...childProps} />;
  }

  // ...Otherwise, render requested component
  return <Component {...childProps} />;
};

LoggedInRoute.propTypes = {
  loadingUser: userPropTypes.loadingUser.isRequired,
  user: userPropTypes.user,
  loadingLocation: locationPropTypes.loadingLocation.isRequired,
  component: PropTypes.func.isRequired,
  overlay: PropTypes.func,
};

LoggedInRoute.defaultProps = {
  user: null,
  overlay: () => {},
};

const enhance = compose(
  withUser,
  withLocation,
);

export default enhance(LoggedInRoute);
