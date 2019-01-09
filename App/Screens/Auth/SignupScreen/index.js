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
const SignupScreen = ({ navigation, onSuccessHook }) => (
  <Container bgColor={Colors.concrete}>
    <Spacer size="XL" />
    <RaisedButton
      label={I18n.t('signupScreen.googlePlusBtnLabel')}
      iconSet="MaterialCommunityIcon"
      iconName="google"
      iconSize={20}
      variant="google"
    />
    <Spacer size="XXL" />
    <Spacer size="M" />
    <RaisedButton
      label={I18n.t('signupScreen.facebookBtnLabel')}
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
      label={I18n.t('signupScreen.emailBtnLabel')}
      iconSet="MaterialCommunityIcon"
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
