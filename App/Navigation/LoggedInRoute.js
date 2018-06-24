import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
  component,
  overlay,
  ...rest
}) => {
  const childProps = { user, ...rest };
  // In case user is not logged in, render overlay component
  if (!user || !user.uuid) {
    return React.createElement(overlay, childProps);
  }
  // ...Otherwise, render requested component
  return React.createElement(component, childProps);
};

LoggedInRoute.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string,
  }),
  component: PropTypes.func.isRequired,
  overlay: PropTypes.func,
};

LoggedInRoute.defaultProps = {
  user: null,
  overlay: () => {},
};

const mapStateToProps = ({ user }) => ({ user });
const withRedux = connect(mapStateToProps, null);

export default withRedux(LoggedInRoute);
