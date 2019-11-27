import React from 'react';
import PropTypes from 'prop-types';
import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';
import FieldBackground from '../Backgrounds/FieldBackground';
import userStore from 'App/Stores/User';
import {observer} from "mobx-react";

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is NOT authenticated. In case she is, call onLoggedIn callback.
 */
@observer
class LoggedOutRoute extends React.PureComponent {
  isLoggedIn = () => !userStore.loading && userStore.user && userStore.user.uuid

  componentWillMount() {
    if (this.isLoggedIn()) {
      this.props.onLoggedIn();
    }
  }

  componentWillUpdate(nextProps) {
    if (this.isLoggedIn()) {
      nextProps.onLoggedIn();
    }
  }

  render() {
    const {
      component: Component,
      onLoggedIn,
      ...rest
    } = this.props;

    // Wait until user is ready
    if (userStore.loading) {
      return (
        <FieldBackground>
          <CenteredActivityIndicator secondary={true} />
        </FieldBackground>
      );
    }

    // In case user IS logged in, render overlay component
    if (userStore.user && userStore.user.uuid) {
      return <CenteredActivityIndicator />;
    }

    // ...Otherwise, render requested component
    return <Component {...rest} />;
  }
}

LoggedOutRoute.propTypes = {
  component: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func,
};

LoggedOutRoute.defaultProps = {
  onLoggedIn: () => {},
};

export default LoggedOutRoute;
