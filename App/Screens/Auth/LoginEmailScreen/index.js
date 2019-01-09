import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import FormProps from '../../../RenderProps/form-props';
import LoginEmailApiCall from '../../../Components/Auth/LoginEmailApiCall';
import LoginEmailForm from '../../../Components/Auth/LoginEmailForm';

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
const LoginEmailScreen = ({ onSuccessHook }) => (
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
      <LoginEmailApiCall
        onLoginError={handleServerError}
        onLoginSuccess={() => {
          handleSuccess(onSuccessHook);
        }}
      >
        {({ loginUser }) => (
          <Container>
            <LoginEmailForm
              disabled={disabled}
              errors={errors}
              onBeforeHook={handleBefore}
              onClientCancelHook={handleClientCancel}
              onClientErrorHook={handleClientError}
              // Call api to authenticate user
              onSuccessHook={loginUser}
            />
          </Container>
        )}
      </LoginEmailApiCall>
    )}
  </FormProps>
);

LoginEmailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onSuccessHook: PropTypes.func,
};

LoginEmailScreen.defaultProps = {
  onSuccessHook: () => {},
};

export default LoginEmailScreen;
