import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-root-toast';
import isString from 'lodash/isString';
import { disabledPropTypes } from './disabled-props';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const toastConfig = {
  duration: Toast.durations.LONG,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
};
//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class HookProps extends React.PureComponent {
  handleBefore = (cb) => {
    const { disabledProps } = this.props;
    disabledProps.disableBtn();
    // Allow other components to extend handleBefore default functionality
    if (cb && typeof cb === 'function') { cb(); }
  }

  handleClientCancel = () => {
    const { disabledProps } = this.props;
    disabledProps.enableBtn();
  }

  handleClientError = () => {
    const { disabledProps } = this.props;
    // TODO: log error
    disabledProps.enableBtn();
  }

  handleServerError = (err) => {
    const { disabledProps } = this.props;
    console.log('SERVER_ERROR', err);
    const errorMsg = ((
      err
      && ((isString(err.reason) && err.reason) || (isString(err.message) && err.message)))
      || 'Unexpected error'
    );
    Toast.show(errorMsg, toastConfig);
    disabledProps.enableBtn();
  }

  handleSuccess = (cb) => {
    const { disabledProps } = this.props;
    disabledProps.enableBtn();
    // Allow other components to extend handleBefore default functionality
    if (cb && typeof cb === 'function') { cb(); }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      handleBefore: this.handleBefore,
      handleClientCancel: this.handleClientCancel,
      handleClientError: this.handleClientError,
      handleServerError: this.handleServerError,
      handleSuccess: this.handleSuccess,
    };

    return children(api);
  }
}

HookProps.propTypes = {
  disabledProps: PropTypes.shape(disabledPropTypes).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default HookProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const hookPropTypes = {
  handleBefore: PropTypes.func.isRequired,
  handleClientCancel: PropTypes.func.isRequired,
  handleClientError: PropTypes.func.isRequired,
  handleServerError: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};
