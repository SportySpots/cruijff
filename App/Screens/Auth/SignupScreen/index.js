import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import FormProps from '../../../RenderProps/form-props';
import SignupApiCall from '../../../Components/Auth/SignupApiCall';
import SignupForm from '../../../Components/Auth/SignupForm';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;
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
          <Container>
            <SignupForm
              disabled={disabled}
              errors={errors}
              onBeforeHook={handleBefore}
              onClientCancelHook={handleClientCancel}
              onClientErrorHook={handleClientError}
              // Call api to register user
              onSuccessHook={signupUser}
            />
          </Container>
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
