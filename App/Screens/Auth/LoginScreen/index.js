import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import Fonts from '../../../Themes/Fonts';
import FormProps from '../../../RenderProps/form-props';
import LoginEmailApiCall from '../../../Components/Auth/LoginEmailApiCall';
import LoginEmailFormContainer from '../../../Components/Auth/LoginEmailFormContainer';
import LoginEmailForm from '../../../Components/Auth/LoginEmailForm';
import Block from '../../../Components/Common/Block';
import Spacer from '../../../Components/Common/Spacer';
import OrDivider from '../../../Components/Common/OrDivider';
import RaisedButton from '../../../Components/Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const FONT_WIDTH = Fonts.style.M.fontSize * 0.43;
const FLAP_WIDTH = I18n.t('loginScreen.emailSectionTitle').length * FONT_WIDTH + 2 * 32;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.concrete};
`;
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LoginScreen = ({ navigation, onSuccessHook }) => (
  <Container>
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
      <Spacer size="XL" />
    </Block>
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
            <LoginEmailFormContainer
              title={I18n.t('loginScreen.emailSectionTitle')}
              width={FLAP_WIDTH}
            >
              <LoginEmailForm
                disabled={disabled}
                errors={errors}
                onBeforeHook={handleBefore}
                onClientCancelHook={handleClientCancel}
                onClientErrorHook={handleClientError}
                // Call api to authenticate user
                onSuccessHook={loginUser}
              />
            </LoginEmailFormContainer>
          )}
        </LoginEmailApiCall>
      )}
    </FormProps>
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

/*
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
// import FormProps from '../../../RenderProps/form-props';
import Block from '../../../Components/Common/Block';
import Spacer from '../../../Components/Common/Spacer';
import OrDivider from '../../../Components/Common/OrDivider';
import RaisedButton from '../../../Components/Common/RaisedButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled(Block)`
  flex: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LoginScreen = ({ navigation, onSuccessHook }) => (
  <Container bgColor={Colors.concrete}>
    <Spacer size="XL" />
    <RaisedButton
      label={I18n.t('loginScreen.googlePlusBtnLabel')}
      iconSet="MaterialCommunityIcon"
      iconName="google"
      iconSize={20}
      variant="google"
    />
    <Spacer size="XXL" />
    <Spacer size="M" />
    <RaisedButton
      label={I18n.t('loginScreen.facebookBtnLabel')}
      iconSet="MaterialCommunityIcon"
      iconName="facebook-box"
      variant="facebook"
    />
    <Spacer size="XXL" />
    <Spacer size="M" />
    <OrDivider />
    <Spacer size="XXL" />
    <Spacer size="M" />
    <RaisedButton
      label={I18n.t('loginScreen.emailBtnLabel')}
      iconSet="MaterialCommunityIcon"
      iconName="email"
      variant="default"
      onPress={() => {
        navigation.navigate('LoginEmailScreen');
      }}
    />
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

*/