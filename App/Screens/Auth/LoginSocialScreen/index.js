import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import FormProps from '../../../RenderProps/form-props';
import Block from '../../../Components/Common/Block';
import Spacer from '../../../Components/Common/Spacer';
import OrDivider from '../../../Components/Common/OrDivider';
import RaisedButton from '../../../Components/Common/RaisedButton';
import LoginApiCall from '../../../Components/Auth/LoginApiCall';

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
const LoginSocialScreen = ({ onSuccessHook }) => (
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
          <Container bgColor={Colors.concrete}>
            <Spacer size="XL" />
            <RaisedButton
              label={I18n.t('loginSocialScreen.googlePlusBtnLabel')}
              iconSet="MaterialCommunityIcon"
              iconName="google-plus"
              variant="google"
            />
            <Spacer size="XXL" />
            <Spacer size="M" />
            <RaisedButton
              label={I18n.t('loginSocialScreen.facebookBtnLabel')}
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
              label={I18n.t('loginSocialScreen.emailBtnLabel')}
              iconSet="MaterialCommunityIcon"
              iconName="email"
              variant="default"
            />
          </Container>
        )}
      </LoginApiCall>
    )}
  </FormProps>
);

LoginSocialScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onSuccessHook: PropTypes.func,
};

LoginSocialScreen.defaultProps = {
  onSuccessHook: () => {},
};

export default LoginSocialScreen;
