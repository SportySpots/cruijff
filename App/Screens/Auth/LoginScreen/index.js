import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import FormProps from '../../../RenderProps/form-props';
import LoginEmailApiCall from '../../../Components/Auth/LoginEmailApiCall';
import LoginEmailForm from '../../../Components/Auth/LoginEmailForm';
import Block from '../../../Components/Common/Block';
// import Row from '../../../Components/Common/Row';
import Spacer from '../../../Components/Common/Spacer';
import OrDivider from '../../../Components/Common/OrDivider';
import RaisedButton from '../../../Components/Common/RaisedButton';
import Flap from '../../../Components/Common/Flap';
// import LinkNavigate from '../../../Components/Common/LinkNavigate';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
const Top = styled.View`
  background-color: ${Colors.concrete};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LoginScreen = ({ navigation, onSuccessHook }) => (
  <Container>
    <KeyboardAwareScrollView
      extraHeight={70}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
    >
      <Top>
        <Block>
          <Spacer size="XL" />
          <RaisedButton
            label={I18n.t('loginScreen.googlePlusBtnLabel')}
            iconSet="MaterialCommunityIcon"
            iconName="google"
            iconSize={20}
            variant="google"
          />
          <Spacer size="XXL" />
          <RaisedButton
            label={I18n.t('loginScreen.facebookBtnLabel')}
            iconSet="MaterialCommunityIcon"
            iconName="facebook-box"
            variant="facebook"
          />
          <Spacer size="XXL" />
          <Spacer size="M" />
          <OrDivider />
        </Block>
        <Spacer size="XL" />
        <Flap title={I18n.t('loginScreen.emailSectionTitle')} />
      </Top>
      <Spacer size="M" />
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
            onLoginSuccess={() => { handleSuccess(onSuccessHook); }}
          >
            {({ loginUser }) => [
              <LoginEmailForm
                key="form"
                disabled={disabled}
                errors={errors}
                onBeforeHook={handleBefore}
                onClientCancelHook={handleClientCancel}
                onClientErrorHook={handleClientError}
                // Call api to authenticate user
                onSuccessHook={loginUser}
              />,
            ]}
          </LoginEmailApiCall>
        )}
      </FormProps>
    </KeyboardAwareScrollView>
  </Container>
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

/* <Block>
  <Row justifyContent="center">
    <LinkNavigate
      navigation={navigation}
      to="SignupScreen"
      text={I18n.t('loginScreen.signupLink')}
      underline
    />
  </Row>
</Block> */
