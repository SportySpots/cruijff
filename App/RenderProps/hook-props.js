import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View } from 'react-native';
import isString from 'lodash/isString';
import Fonts from '../Themes/Fonts';
import Colors from '../Themes/Colors';
import { disabledPropTypes } from './disabled-props';
import Toast from '../Components/Common/Toast';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class HookProps extends React.PureComponent {
  handleBefore = (cb) => {
    const { disabledProps } = this.props;
    Keyboard.dismiss();
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
    const errorMsg = ((
      err
      && ((isString(err.reason) && err.reason) || (isString(err.message) && err.message)))
      || 'Unexpected error'
    );
    this.toast.show(errorMsg, 2000);
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

    return (
      <View style={{ flex: 1 }}>
        <Toast ref={(toast) => { this.toast = toast; }} />
        {children(api)}
      </View>
    );
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
