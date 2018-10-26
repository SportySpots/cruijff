import React from 'react';
import PropTypes from 'prop-types';
import DisabledProps, { disabledPropTypes } from './disabled-props';
import HookProps, { hookPropTypes } from './hook-props';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
const FormProps = ({ children }) => (
  <DisabledProps>
    {disabledProps => (
      <HookProps disabledProps={disabledProps}>
        {(hookProps) => {
          // Public API
          const api = {
            disabled: disabledProps.disabled,
            handleBefore: hookProps.handleBefore,
            handleClientCancel: hookProps.handleClientCancel,
            handleClientError: hookProps.handleClientError,
            handleServerError: hookProps.handleServerError,
            handleSuccess: hookProps.handleSuccess,
          };

          return children(api);
        }}
      </HookProps>
    )}
  </DisabledProps>
);

FormProps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default FormProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const formPropTypes = {
  disabled: disabledPropTypes.disabled,
  ...hookPropTypes,
};
