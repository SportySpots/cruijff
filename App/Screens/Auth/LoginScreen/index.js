import React from 'react';
// import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import settings from '../../../config';
import I18n from '../../../I18n';
import FormProps from '../../../RenderProps/form-props';
import LoginEmailApiCall from '../../../Components/Auth/LoginEmailApiCall';
import LoginEmailForm from '../../../Components/Auth/LoginEmailForm';
// import Block from '../../../Components/Common/Block';
// import { IncomingLinks, Events } from '../../../Services/IncomingLinks';
// import Row from '../../../Components/Common/Row';
// import Spacer from '../../../Components/Common/Spacer';
// import OrDivider from '../../../Components/Common/OrDivider';
// import RaisedButton from '../../../Components/Common/RaisedButton';
// import Flap from '../../../Components/Common/Flap';
// import { userPropTypes, withUser } from '../../../Context/User';
// import Text from '../../../Components/Common/Text';
import LinkNavigate from '../../../Components/Common/LinkNavigate';
// import LinkNavigate from '../../../Components/Common/LinkNavigate';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
const Top = styled.View`
  padding-top: 32px;
`;
//------------------------------------------------------------------------------
const Bottom = styled.View`
  padding-top: 16px;
  padding-bottom: 16px;
  align-items: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LoginScreen extends React.PureComponent {
  render() {
    const { navigation, onSuccessHook } = this.props;
    const { email = '' } = navigation.state.params;

    return (
      <Container>
        <Top>
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
                onEmailSent={() => {
                  handleSuccess(onSuccessHook);
                }}
              >
                {({ loginUser }) => (
                  <LoginEmailForm
                    email={email}
                    disabled={disabled}
                    errors={errors}
                    onBeforeHook={handleBefore}
                    onClientCancelHook={handleClientCancel}
                    onClientErrorHook={handleClientError}
                    // Call api to authenticate user
                    onSuccessHook={loginUser}
                  />
                )}
              </LoginEmailApiCall>
            )}
          </FormProps>
        </Top>
        <Bottom>
          <LinkNavigate
            navigation={navigation}
            to="SignupEmailScreen"
            text={I18n.t('loginScreen.signupLink')}
            underline
          />
        </Bottom>
      </Container>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onSuccessHook: PropTypes.func,
  // loginWithToken: userPropTypes.loginWithToken.isRequired,
};

LoginScreen.defaultProps = {
  onSuccessHook: () => {},
};

export default LoginScreen;

// socialLoginNotRegisteredHandler = async () => {
//   console.log('trying to login, but not registered');
// }

// componentWillMount() {
//   IncomingLinks.on(Events.SOCIAL_LOGIN_NOT_REGISTERED, this.socialLoginNotRegisteredHandler);
// }

// componentWillUnmount() {
//   IncomingLinks.removeListener(
//     Events.SOCIAL_LOGIN_NOT_REGISTERED,
//     this.socialLoginNotRegisteredHandler,
//   );
// }