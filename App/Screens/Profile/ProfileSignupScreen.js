import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import DefaultButton from '../../Components/DefaultButton';
import Text from '../../Components/Text';
import I18n from '../../I18n/index';
import images from '../../Themes/Images';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
//------------------------------------------------------------------------------
const ButtonContainer = styled.View`
  align-self: stretch;
`;
//------------------------------------------------------------------------------
const LinkLabel = styled(Text.M)`
  text-align: center;
  text-decoration-line: underline;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileSignupScreen = ({ navigation }) => (
  <MainContainer>
    <View style={{ alignItems: 'center' }}>
      <Image source={images.createProfileAvatar} />
      <View style={{ height: 32 }} />
      <Text.L>{I18n.t('Sign up')}!</Text.L>
      <View style={{ height: 32 }} />
      <Text.M>{I18n.t('Sign up and start sporting')}</Text.M>
    </View>
    <ButtonContainer>
      <DefaultButton
        onPress={() => { navigation.navigate('SignupScreen'); }}
        text={I18n.t('Register')}
      />
    </ButtonContainer>
    <TouchableOpacity
      onPress={() => { navigation.navigate('LoginScreen'); }}
    >
      <LinkLabel>{I18n.t('Already signed up? Log in')}</LinkLabel>
    </TouchableOpacity>
  </MainContainer>
);

ProfileSignupScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(ProfileSignupScreen);
