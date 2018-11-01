import React from 'react';
import PropTypes from 'prop-types';
import DisabledProps, { disabledPropTypes } from './disabled-props';
import ErrorProps, { errorPropTypes } from './error-props';
import HookProps, { hookPropTypes } from './hook-props';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
const FormProps = ({ children }) => (
  <DisabledProps>
    {disabledProps => (
      <ErrorProps>
        {errorProps => (
          <HookProps
            disabledProps={disabledProps}
            errorProps={errorProps}
          >
            {(hookProps) => {
              // Public API
              const api = {
                disabled: disabledProps.disabled,
                errors: errorProps.errors,
                setErrors: errorProps.setErrors,
                clearErrors: errorProps.clearErrors,
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
      </ErrorProps>
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
  errors: errorPropTypes.errors,
  setErrors: errorPropTypes.setErrors,
  clearErrors: errorPropTypes.clearErrors,
  ...hookPropTypes,
};
