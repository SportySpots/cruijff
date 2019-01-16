import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { withUser, userPropTypes } from '../../../Context/User';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import FieldBackground from '../../../Backgrounds/FieldBackground';
import Block from '../../../Components/Common/Block';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import RaisedButton from '../../../Components/Common/RaisedButton';
import globalRefs from '../../../globalRefs';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Label = styled(Text.ML)`
  color: ${Colors.white}
  text-align: center;
  font-size: 30px;
`;
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
const LinkLabel = styled(Text.M)`
  color: ${Colors.white}
  text-align: center;
  text-decoration-line: underline;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SplashScreen extends React.Component {
  async componentDidMount() {
    globalRefs.SplashScreen = this;
  }

  render() {
    const { navigation, user, firstRun } = this.props;

    return (
      <FieldBackground>
        <Label testID="splashText">
          {I18n.t('splashScreen.title')}
        </Label>
        <FlexOne />
        <Block>
          <RaisedButton
            testID="start"
            variant="default"
            label={I18n.t('splashScreen.btnLabel')}
            accessibilityLabel={I18n.t('splashScreen.btnLabel')}
            onPress={() => {
              // navigation.navigate('OnboardingScreen');
              navigation.navigate(firstRun ? 'OnboardingScreen' : 'MainNav');
            }}
          />
          <Spacer size="XL" />
          {(!user || !user.uuid) && (
            <TouchableOpacity
              testID="splashLoginButton"
              onPress={() => { navigation.navigate('LoginScreen'); }}
            >
              <LinkLabel>{I18n.t('splashScreen.loginLink')}</LinkLabel>
            </TouchableOpacity>
          )}
        </Block>
        <Spacer size="XL" />
      </FieldBackground>
    );
  }
}

SplashScreen.propTypes = {
  user: userPropTypes.user,
  firstRun: userPropTypes.firstRun,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

SplashScreen.defaultProps = {
  user: null,
  firstRun: false,
};

export default withUser(SplashScreen);
