import React from 'react';
import PropTypes from 'prop-types';
import FormProps from '../../../RenderProps/form-props';
import SignupApiCall from '../../../Components/Auth/SignupApiCall';
import SignupForm from '../../../Components/Auth/SignupForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SignupScreen = ({ onSuccessHook }) => (
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
      <SignupApiCall
        onSignupError={handleServerError}
        onSignupSuccess={() => {
          handleSuccess(onSuccessHook);
        }}
      >
        {({ signupUser }) => (
          <SignupForm
            disabled={disabled}
            errors={errors}
            onBeforeHook={handleBefore}
            onClientCancelHook={handleClientCancel}
            onClientErrorHook={handleClientError}
            // Call api to register user
            onSuccessHook={signupUser}
          />
        )}
      </SignupApiCall>
    )}
  </FormProps>
);

SignupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onSuccessHook: PropTypes.func,
};

SignupScreen.defaultProps = {
  onSuccessHook: () => {},
};

export default SignupScreen;
