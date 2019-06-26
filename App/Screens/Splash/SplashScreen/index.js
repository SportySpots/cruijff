import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import { compose } from 'react-apollo';
import { withUser, userPropTypes } from '../../../Context/User';
import I18n from '../../../I18n';
import FieldBackground from '../../../Backgrounds/FieldBackground';
import Block from '../../../Components/Common/Block';
import Row from '../../../Components/Common/Row';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import RaisedButton from '../../../Components/Common/RaisedButton';
import LinkNavigate from '../../../Components/Common/LinkNavigate';
import globalRefs from '../../../globalRefs';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SplashScreen extends React.Component {
  componentDidMount() {
    globalRefs.SplashScreen = this;
  }

  render() {
    const { navigation, user } = this.props;

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
              AsyncStorage.getItem('userCity').then((city) => {
                navigation.navigate(city ? 'MainNav' : 'OnboardingScreen');
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
  user: userPropTypes.user,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

SplashScreen.defaultProps = {
  user: null,
};

const enhance = compose(
  withUser,
);

export default enhance(SplashScreen);
