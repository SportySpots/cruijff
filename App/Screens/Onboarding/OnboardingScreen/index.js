import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import I18n from '../../../I18n';
import OnboardingForm from '../../../Components/Onboarding/OnboardingForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class OnboardingScreen extends React.Component {
  // Handle android back button press
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleLeave);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.handleLeave);
    }
  }

  handleLeave = () => {
    Keyboard.dismiss();

    const { navigation } = this.props;

    Alert.alert(
      I18n.t('onboardingScreen.leaveAlert.header'),
      I18n.t('onboardingScreen.leaveAlert.body'),
      [
        {
          text: I18n.t('onboardingScreen.leaveAlert.footer.cancelBtnLabel'),
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: I18n.t('onboardingScreen.leaveAlert.footer.okBtnLabel'),
          onPress: () => { navigation.goBack(null); },
        },
      ],
    );

    // Need this for android back handler btn to work
    return true;
  }

  render() {
    return (
      <OnboardingForm
        navigation={this.props.navigation}
      />
    );
  }
}

OnboardingScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default OnboardingScreen;
