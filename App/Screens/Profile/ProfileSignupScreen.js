import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DefaultButton from '../../Components/DefaultButton';
import Text from '../../Components/Text';
import I18n from '../../I18n/index';
import images from '../../Themes/Images';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const CloseBtnContainer = styled.View`
  height: 55;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
`;
//------------------------------------------------------------------------------
const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
//------------------------------------------------------------------------------
const Center = styled.View`
  align-items: center;
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
// TODO: ideally we should pass onClose instead of () => { navigation.goBack(null); }
const ProfileSignupScreen = ({ closable, onClose, navigation }) => [
  closable && (
    <CloseBtnContainer key="close-btn">
      <TouchableOpacity onPress={() => { navigation.goBack(null); }}>
        <Icon name="close" size={24} color="black" />
      </TouchableOpacity>
    </CloseBtnContainer>
  ),
  <MainContainer key="content">
    <Center>
      <Image source={images.createProfileAvatar} />
      <View style={{ height: 32 }} />
      <Text.L>{I18n.t('Sign up')}!</Text.L>
      <View style={{ height: 32 }} />
      <Text.M>{I18n.t('Sign up and start sporting')}</Text.M>
    </Center>
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
  </MainContainer>,
];

ProfileSignupScreen.propTypes = {
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ProfileSignupScreen.defaultProps = {
  closable: false,
  onClose: () => {},
};

export default withNavigation(ProfileSignupScreen);
