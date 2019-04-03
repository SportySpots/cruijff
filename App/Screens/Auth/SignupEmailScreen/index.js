import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormProps from '../../../RenderProps/form-props';
import SignupEmailApiCall from '../../../Components/Auth/SignupEmailApiCall';
import SignupEmailForm from '../../../Components/Auth/SignupEmailForm';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  padding-top: 32px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SignupEmailScreen = ({ onSuccessHook }) => (
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
      <SignupEmailApiCall
        onSignupError={handleServerError}
        onSignupSuccess={() => {
          handleSuccess(onSuccessHook);
        }}
      >
        {({ signupUser }) => (
          <Container>
            <SignupEmailForm
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
      </SignupEmailApiCall>
    )}
  </FormProps>
);

SignupEmailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onSuccessHook: PropTypes.func,
};

SignupEmailScreen.defaultProps = {
  onSuccessHook: () => {},
};

export default SignupEmailScreen;
