import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../I18n/index';
import Images from '../Themes/Images';
import ScreenSlider from '../Components/ScreenSlider/index';
import Onboarding from '../Components/Onboarding';
import globalRefs from '../globalRefs';

const data = [
  {
    title: I18n.t('hi-sport'),
    text: I18n.t('onboarding-1'),
    image: Images.illustrationWizard1,
  },
  {
    title: I18n.t('join-a-game'),
    text: I18n.t('onboarding-2'),
    image: Images.illustrationWizard2,
  },
  {
    title: I18n.t('plan-a-game'),
    text: I18n.t('onboarding-3'),
    image: Images.illustrationWizard3,
  },
];

class OnboardingScreen extends React.Component {
  componentDidMount() {
    globalRefs.OnBoardingScreen = this;
    // super.componentDidMount();
  }
  render() {
    const { navigation } = this.props;
    return (
      <ScreenSlider
        data={data}
        style={{ flex: 1 }}
        renderItem={({ item }) => <Onboarding {...item} />}
        footerText={(item, index) => I18n.t(index < data.length - 1 ? 'continue' : 'lets go')}
        onDone={() => navigation.navigate('LocationPermissionScreen')}
      />
    );
  }
}

OnboardingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default OnboardingScreen;
