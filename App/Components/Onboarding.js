import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../I18n';
import Images from '../Themes/Images';
import ScreenSlider from './ScreenSlider/index';
import OnboardingScreen from '../Screens/OnboardingScreen';

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

const Onboarding = ({ navigation }) => (
  <ScreenSlider
    data={data}
    style={{ flex: 1 }}
    renderItem={({ item }) => <OnboardingScreen {...item} />}
    footerText={(item, index) => I18n.t(index < data.length - 1 ? 'continue' : 'lets go')}
    onDone={() => navigation.navigate('LocationPermissionScreen')}
  />
);

Onboarding.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Onboarding;
