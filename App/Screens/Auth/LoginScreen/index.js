import React from 'react';
import PropTypes from 'prop-types';
import FormProps from '../../../RenderProps/form-props';
import LoginApiCall from '../../../Components/Auth/LoginApiCall';
import LoginForm from '../../../Components/Auth/LoginForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LoginScreen = ({ onSuccessHook }) => (
  <FormProps>
    {({
      disabled,
      errors,
      handleBefore,
      handleClientCancel,
      handleClientError,
      handleServerError,
      handleSuccess,
    }) => (
      <LoginApiCall
        onLoginError={handleServerError}
        onLoginSuccess={() => {
          handleSuccess(onSuccessHook);
        }}
      >
        {({ loginUser }) => (
          <LoginForm
            disabled={disabled}
            errors={errors}
            onBeforeHook={handleBefore}
            onClientCancelHook={handleClientCancel}
            onClientErrorHook={handleClientError}
            // Call api to authenticate user
            onSuccessHook={loginUser}
          />
        )}
      </LoginApiCall>
    )}
  </FormProps>
);

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onSuccessHook: PropTypes.func,
};

LoginScreen.defaultProps = {
  onSuccessHook: () => {},
};

export default LoginScreen;
