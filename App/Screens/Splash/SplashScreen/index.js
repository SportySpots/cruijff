import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import { compose } from 'react-apollo';
import I18n from '../../../I18n';
import FieldBackground from '../../../Backgrounds/FieldBackground';
import Block from '../../../Components/Common/Block';
import Row from '../../../Components/Common/Row';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import RaisedButton from '../../../Components/Common/RaisedButton';
import LinkNavigate from '../../../Components/Common/LinkNavigate';
import globalRefs from '../../../globalRefs';
import {observer} from "mobx-react";
import userStore from 'App/Stores/User';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
@observer
class SplashScreen extends React.Component {
  componentDidMount() {
    globalRefs.SplashScreen = this;
  }

  render() {
    const { navigation } = this.props;
    const user = userStore.user;

    return (
      <FieldBackground>
        <Block>
          <Text
            testID="splashText"
            size="L"
            color="white"
            center
            style={{ fontSize: 30 }}
          >
            {I18n.t('splashScreen.title')}
          </Text>
        </Block>
        <FlexOne />
        <Block>
          <RaisedButton
            testID="start"
            variant="default"
            label={I18n.t('splashScreen.btnLabel')}
            accessibilityLabel={I18n.t('splashScreen.btnLabel')}
            onPress={() => {
              AsyncStorage.getItem('OnboardingCompleted').then((completed) => {
                navigation.navigate(completed ? 'MainNav' : 'OnboardingScreen');
              });
            }}
          />
          <Spacer size="XL" />
          {(!user || !user.uuid) && (
            <Row justifyContent="center">
              <LinkNavigate
                testID="splashLoginButton"
                navigation={navigation}
                to="LoginScreen"
                text={I18n.t('splashScreen.loginLink')}
                color="white"
                underline
              />
            </Row>
          )}
        </Block>
        <Spacer size="XL" />
      </FieldBackground>
    );
  }
}

SplashScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SplashScreen;
