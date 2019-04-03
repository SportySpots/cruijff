import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View } from 'react-native';
import firebase from 'react-native-firebase';
import Swiper from 'react-native-swiper';
import styled from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import I18n from '../../../I18n';
import { addGlobalRef } from '../../../globalRefs';
import Images from '../../../Themes/Images';
import ImageBackground from '../../../Backgrounds/ImageBackground';
import Footer from '../../Common/DarkFooter';
import LocationSlide, { INIT_STATE as LOCATION_INIT_STATE } from '../LocationSlide';
import NotificationPermissionSlide, { NOTIFICATION_PERMISSION } from '../NotificationPermissionSlide';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const getSlides = async () => {
  const slides = [
    {
      id: 'welcomeSlide',
      Comp: () => (
        <ImageBackground
          title={I18n.t('onboardingScreen.welcome.title')}
          text={I18n.t('onboardingScreen.welcome.text')}
          image={Images.illustrationWizard1}
        />
      ),
    },
    {
      id: 'joinGameSlide',
      Comp: () => (
        <ImageBackground
          title={I18n.t('onboardingScreen.joinGame.title')}
          text={I18n.t('onboardingScreen.joinGame.text')}
          image={Images.illustrationWizard2}
        />
      ),
    },
    {
      id: 'planGameSlide',
      Comp: () => (
        <ImageBackground
          title={I18n.t('onboardingScreen.planGame.title')}
          text={I18n.t('onboardingScreen.planGame.text')}
          image={Images.illustrationWizard3}
        />
      ),
    },
    {
      id: 'locationSlide',
      Comp: LocationSlide,
      requiredFields: LocationSlide.requiredFields,
    },
  ];

  const hasNotificationPermission = await firebase.messaging().hasPermission();
  if (!hasNotificationPermission) {
    slides.push({
      id: 'notificationPermissionSlide',
      Comp: NotificationPermissionSlide,
      requiredFields: NotificationPermissionSlide.requiredFields,
    });
  }

  return slides;
};

const INIT_STATE = {
  ...cloneDeep(LOCATION_INIT_STATE),
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class OnboardingForm extends React.Component {
  constructor(props) {
    super(props);

    addGlobalRef('OnBoardingScreen')(this);

    this.state = {
      slides: null,
      curSlide: 0,
      notificationPermission: NOTIFICATION_PERMISSION.UNDEFINED,
      ...cloneDeep(INIT_STATE),
    };

    getSlides().then((slides) => {
      this.setState({ slides });
    });

    // console.log('INIT STATE', this.state);
  }

  handleChange = ({ fieldName, value }) => {
    this.setState({ [fieldName]: value });
  }

  get disableNext() {
    const { curSlide, slides } = this.state;

    // Get required fields for the current slide
    const { requiredFields } = slides[curSlide];

    // Disable next btn (return 'true') if at least on of the required fields isn't set
    if (requiredFields) {
      for (const fieldName of requiredFields) {
        // const fieldName = requiredFields[i];
        if (!this.state[fieldName]) { // eslint-disable-line
          return true;
        }
      }
    }

    // Enable btn otherwise (all required fields are set)
    return false;
  }

  get buttonNextText() {
    const { curSlide, slides } = this.state;
    return curSlide < slides.length - 1 ? 'onboardingScreen.nextBtnLabel' : 'onboardingScreen.lastBtnLabel';
  }


  handleNext = async () => {
    Keyboard.dismiss();

    const { curSlide, slides } = this.state;

    firebase.analytics().logEvent(`onboarding_footer_next_btn_press_idx_${curSlide}`);

    // If it's NOT the last slide, increment slide counter and slide forward one position
    if (curSlide !== slides.length - 1) {
      this.setState(
        prevState => ({ curSlide: prevState.curSlide + 1 }),
        () => { this.swiper.scrollBy(1); },
      );
      return;
    }

    // Otherwise, gather input field values and pass event up to parent component
    const {
      onBeforeHook,
      onClientCancelHook,
      // onClientErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Pass event up to parent component
    onSuccessHook(pick(this.state, Object.keys(INIT_STATE)));
  }

  render() {
    const { disabled } = this.props;
    const { curSlide, slides, ...rest } = this.state;
    if (!slides) {
      return null;
    }
    return (
      <FlexOne>
        <Swiper
          ref={(swiper) => { this.swiper = swiper; }}
          scrollEnabled={false}
          loop={false}
          showsPagination={false}
        >
          {slides.map(({ id, Comp }, index) => (
            <FlexOne key={id}>
              {index === curSlide ? (
                <Comp
                  onChange={this.handleChange}
                  // Pass down all state values: location, sports, etc.
                  {...rest}
                />
              ) : <View />}
            </FlexOne>
          ))}
        </Swiper>
        <Footer
          numPages={slides.length}
          currentPage={curSlide}
          onNext={this.handleNext}
          disableNext={this.disableNext || disabled}
          buttonNextText={I18n.t(this.buttonNextText)}
          showBack={false}
        />
      </FlexOne>
    );
  }
}

OnboardingForm.propTypes = {
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

OnboardingForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onSuccessHook: () => {},
};

export default OnboardingForm;

/*
import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import Images from '../../../Themes/Images';
import ScreenSlider from '../../../Components/Common/ScreenSlider';
import OnboardingSlide from '../../../Components/Onboarding/OnboardingSlide';
import globalRefs from '../../../globalRefs';

const data = [
  {
    title: I18n.t('onboardingScreen.hiSporter.title'),
    text: I18n.t('onboardingScreen.hiSporter.text'),
    image: Images.illustrationWizard1,
  },
  {
    title: I18n.t('onboardingScreen.joinGame.title'),
    text: I18n.t('onboardingScreen.joinGame.text'),
    image: Images.illustrationWizard2,
  },
  {
    title: I18n.t('onboardingScreen.planGame.title'),
    text: I18n.t('onboardingScreen.planGame.text'),
    image: Images.illustrationWizard3,
  },
];

class OnboardingScreen extends React.Component {
  componentDidMount() {
    globalRefs.OnBoardingScreen = this;
    // super.componentDidMount();
  }

  render() {
    const { onSuccessHook } = this.props;
    return (
      <ScreenSlider
        data={data}
        style={{ flex: 1 }}
        renderItem={({ item }) => <OnboardingSlide {...item} />}
        footerText={(item, index) => I18n.t(index < data.length - 1 ? 'OnboardingScreen.nextBtnLabel' : 'OnboardingScreen.lastBtnLabel')}
        onDone={onSuccessHook}
      />
    );
  }
}

OnboardingScreen.propTypes = {
  onSuccessHook: PropTypes.func.isRequired,
};

export default OnboardingScreen;

*/
