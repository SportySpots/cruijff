import React from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import settings from '../../../config';
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
const SignupScreen = ({ navigation, onSuccessHook }) => (
  <Container bgColor="concrete">
    <Spacer size="XL" />
    <RaisedButton
      label={I18n.t('signupScreen.googlePlusBtnLabel')}
      iconSet="MaterialCommunityIcons"
      iconName="google"
      iconSize={20}
      variant="google"
      onPress={() => Linking.openURL(`${settings.seedorfRestUrl}/accounts/google/login?process=signup`)}
    />
    <Spacer size="XXL" />
    <Spacer size="M" />
    <RaisedButton
      label={I18n.t('signupScreen.facebookBtnLabel')}
      iconSet="MaterialCommunityIcons"
      iconName="facebook-box"
      variant="facebook"
      onPress={() => Linking.openURL(`${settings.seedorfRestUrl}/accounts/facebook/login?process=signup`)}
    />
    <Spacer size="XXL" />
    <Spacer size="M" />
    <OrDivider />
    <Spacer size="XXL" />
    <Spacer size="M" />
    <RaisedButton
      label={I18n.t('signupScreen.emailBtnLabel')}
      iconSet="MaterialCommunityIcons"
      iconName="email"
      variant="default"
      onPress={() => {
        navigation.navigate('SignupEmailScreen');
      }}
    />
  </Container>
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
