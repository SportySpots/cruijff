import React from 'react';
import PropTypes from 'prop-types';
import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';
import userStore from 'App/Stores/User';
import {observer} from "mobx-react";

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is authenticated. If not, the LoggedInRoute component renders the given
 * overlay component on top of the current route.
 */
const LoggedInRoute = ({
  component: Component,
  overlay: Overlay,
  ...rest
}) => {
  const childProps = { ...rest };

  // Wait until user is ready
  if (userStore.loading) {
    return <CenteredActivityIndicator />;
  }

  // In case user is NOT logged in, render overlay component
  if (!userStore.user) {
    return <Overlay {...childProps} />;
  }

  // ...Otherwise, render requested component
  return <Component {...childProps} />;
};

LoggedInRoute.propTypes = {
  component: PropTypes.func.isRequired,
  overlay: PropTypes.func,
};

LoggedInRoute.defaultProps = {
  overlay: () => {},
};

export default observer(LoggedInRoute);
