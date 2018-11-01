import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import { disabledPropTypes } from './disabled-props';
import { errorPropTypes } from './error-props';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class HookProps extends React.PureComponent {
  handleBefore = (cb) => {
    const { disabledProps, errorProps } = this.props;
    Keyboard.dismiss();
    disabledProps.disableBtn();
    errorProps.clearErrors();
    // Allow other components to extend handleBefore default functionality
    if (cb && typeof cb === 'function') { cb(); }
  }

  handleClientCancel = () => {
    const { disabledProps } = this.props;
    disabledProps.enableBtn();
  }

  handleClientError = () => {
    const { disabledProps } = this.props;
    // Log errors into service
    disabledProps.enableBtn();
  }

  handleServerError = (errors) => {
    const { disabledProps, errorProps } = this.props;
    // console.log(errors);
    errorProps.setErrors(errors);
    disabledProps.enableBtn();
  }

  handleSuccess = (cb) => {
    const { disabledProps, errorProps } = this.props;
    disabledProps.enableBtn();
    errorProps.clearErrors();
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
  errorProps: PropTypes.shape(errorPropTypes).isRequired,
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
