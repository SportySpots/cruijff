import React, {useContext} from 'react';
// import { Linking } from 'react-native';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import LinkNavigate from '../../../Components/Common/LinkNavigate';
import Block from "App/Components/Common/Block";
import TextField from "App/Components/Common/TextField";
import RaisedButton from "App/Components/Common/RaisedButton";
import {View} from "react-native";
import { NavigationContext } from 'react-navigation';
import SeedorfAPI from "App/Services/SeedorfApi";
import curateErrors from "App/utils";



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
const LoginScreen = () => {
  const navigation = useContext(NavigationContext);
  const [ errors, setErrors ] = React.useState([]);
  const [ email, setEmail ] = React.useState('');

  const login = async () => {
    const res = await SeedorfAPI.sendMagicLoginLink(email);
    console.log(res);
    // Pass event up to parent component
    if (res && !res.ok && res.problem) {
      console.log('response', res);
      const errors = curateErrors(res.data);
      setErrors(errors);
      return;
    }
  }


  return (
    <Container>
      <Top>
        <View testID="LoginScreen">
          <Block midHeight key="top">
            <TextField
              testID="loginInputEmail"
              label={I18n.t('loginEmailForm.fields.email.label')}
              placeholder={I18n.t('loginEmailForm.fields.email.placeholder')}
              value={email}
              error={errors}
              size="ML"
              disabled={false}
              keyboardType="email-address"
              // autoFocus
              onChangeText={setEmail}
            />
          </Block>
          <Block>
            <RaisedButton
              testID="loginSubmitButton"
              variant="primary"
              label={I18n.t('loginEmailForm.btnLabel')}
              disabled={false}
              onPress={login}
            />
          </Block>
        </View>
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

export default LoginScreen;

//
// class LoginScreen extends React.PureComponent {
//   render() {
//     const { navigation, onSuccessHook } = this.props;
//     const { email = '' } = navigation.state.params;
//
//
//   }
// }
//
// LoginScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
//   onSuccessHook: PropTypes.func,
//   // loginWithToken: userPropTypes.loginWithToken.isRequired,
// };
//
// LoginScreen.defaultProps = {
//   onSuccessHook: () => {},
// };
//
// export default LoginScreen;
//
// // socialLoginNotRegisteredHandler = async () => {
// //   console.log('trying to login, but not registered');
// // }
//
// // componentWillMount() {
// //   IncomingLinks.on(Events.SOCIAL_LOGIN_NOT_REGISTERED, this.socialLoginNotRegisteredHandler);
// // }
//
// // componentWillUnmount() {
// //   IncomingLinks.removeListener(
// //     Events.SOCIAL_LOGIN_NOT_REGISTERED,
// //     this.socialLoginNotRegisteredHandler,
// //   );
// // }
