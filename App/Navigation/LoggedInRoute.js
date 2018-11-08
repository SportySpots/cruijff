import React from 'react';
import PropTypes from 'prop-types';
import { withUser, userPropTypes } from '../Context/User';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is authenticated. If not, the LoggedInRoute component renders the given
 * overlay component on top of the current route.
 */
const LoggedInRoute = ({
  user,
  component: Component,
  overlay: Overlay,
  ...rest
}) => {
  const childProps = { user, ...rest };
  // In case user is not logged in, render overlay component
  if (!user) {
    return <Overlay {...childProps} />;
  }
  // ...Otherwise, render requested component
  return <Component {...childProps} />;
};

LoggedInRoute.propTypes = {
  user: userPropTypes.user,
  component: PropTypes.func.isRequired,
  overlay: PropTypes.func,
};

LoggedInRoute.defaultProps = {
  user: null,
  overlay: () => {},
};

export default withUser(LoggedInRoute);
