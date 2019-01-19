import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import I18n from '../../../I18n/index';
import images from '../../../Themes/Images';
import ClosableLayout from '../../../Components/Layouts/ClosableLayout';
import RaisedButton from '../../../Components/Common/RaisedButton';
import Row from '../../../Components/Common/Row';
import Text from '../../../Components/Common/Text';
import Spacer from '../../../Components/Common/Spacer';
import LinkNavigate from '../../../Components/Common/LinkNavigate';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Center = styled.View`
  align-items: center;
`;
//------------------------------------------------------------------------------
const ButtonContainer = styled.View`
  align-self: stretch;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LoggedOutScreen = ({ closable, onClose, navigation }) => (
  <ClosableLayout
    theme="black"
    closable={closable}
    onClose={onClose}
  >
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Center>
        <Image source={images.createProfileAvatar} />
        <Spacer size="XXL" />
        <Text.L>{I18n.t('loggedOutScreen.title')}</Text.L>
        <Spacer size="XXL" />
        <Text.M>{I18n.t('loggedOutScreen.subtitle')}</Text.M>
      </Center>
      <Spacer size="L" />
      <ButtonContainer>
        <RaisedButton
          testID="profileButtonSignup"
          label={I18n.t('loggedOutScreen.signupBtnLabel')}
          variant="default"
          onPress={() => { navigation.navigate('SignupScreen'); }}
        />
      </ButtonContainer>
      <Spacer size="L" />
      <Row justifyContent="center">
        <LinkNavigate
          to="LoginScreen"
          text={I18n.t('loggedOutScreen.loginLink')}
          underline
        />
      </Row>
    </ScrollView>
  </ClosableLayout>
);

LoggedOutScreen.propTypes = {
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

LoggedOutScreen.defaultProps = {
  closable: false,
  onClose: () => {},
};

export default withNavigation(LoggedOutScreen);
