import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ScrollView, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../../I18n';
import Images from '../../../Themes/Images';
import ImageBackground from '../../../Backgrounds/ImageBackground';
import Footer from '../../Common/DarkFooter';
import locationStore from 'App/Stores/Location';
import {observer} from "mobx-react";

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const SLIDES = [
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
    id: 'shareLocationSlide',
    Comp: () => (
      <ImageBackground
        title={I18n.t('onboardingScreen.shareLocation.title')}
        text={I18n.t('onboardingScreen.shareLocation.text')}
        image={Images.illustrationShareLocation}
      />
    ),
  },
];

const { width: WINDOW_WIDTH } = Dimensions.get('window');
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
@observer
class OnboardingForm extends React.Component {
  state = {
    curSlide: 0,
  }

  constructor(props) {
    super(props);
    this.compRefs = [];
  }

  handleLastSlide = () => {
    this.hasHandledLastSlide = true;
    setTimeout(async () => {
      const result = await locationStore.enable();
      if (result) {
        AsyncStorage.setItem('OnboardingCompleted', 'true');
        this.props.navigation.navigate('MainNav');
      } else {
        // this.props.navigation.navigate('CityPicker');
        this.props.navigation.navigate('MainNav');
      }
    }, 1000);
  }

  handleScroll = (evt) => {
    const nextSlide = Math.round(evt.nativeEvent.contentOffset.x / WINDOW_WIDTH);
    this.setState({ curSlide: nextSlide });
    if (nextSlide === SLIDES.length - 1 && !this.hasHandledLastSlide) {
      this.handleLastSlide();
    }
  }

  disableNext() {
    // Get required fields for the current slide
    if (this.state.curSlide === SLIDES.length - 1) { return true; }
    const currentComp = this.compRefs[this.state.curSlide];
    if (currentComp) {
      return (currentComp.completed && !currentComp.completed());
    }
    return false;
  }

  get buttonNextText() {
    const { curSlide } = this.state;
    return curSlide < SLIDES.length - 1 ? 'onboardingScreen.nextBtnLabel' : 'onboardingScreen.lastBtnLabel';
  }

  handleNext = async () => {
    Keyboard.dismiss();

    const { curSlide } = this.state;

    firebase.analytics().logEvent(`onboarding_footer_next_btn_press_idx_${curSlide}`);

    // If it's NOT the last slide, slide forward one position
    if (curSlide !== SLIDES.length - 1) {
      // refs are null when doing shallow tests
      if (this.swiper) {
        this.swiper.scrollTo({ x: (curSlide + 1) * WINDOW_WIDTH });
      }
    }
  }

  handleChange = ({ fieldName, value }) => {
    this.setState({ [fieldName]: value });
  }

  render() {
    const { curSlide } = this.state;

    return (
      <FlexOne>
        <ScrollView
          ref={(swiper) => { this.swiper = swiper; }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={this.handleScroll}
        >
          {SLIDES.map(({ id, Comp }, idx) => (
            <FlexOne key={id} style={{ width: WINDOW_WIDTH }}>
              <Comp
                ref={typeof Comp === 'object' ? (ref) => { this.compRefs[idx] = ref; } : undefined}
                onChange={() => this.forceUpdate()}
              />
            </FlexOne>
          ))}
        </ScrollView>
        <Footer
          numPages={SLIDES.length}
          currentPage={curSlide}
          onNext={this.handleNext}
          disableNext={this.disableNext()}
          buttonNextText={I18n.t(this.buttonNextText)}
          showBack={false}
        />
      </FlexOne>
    );
  }
}

OnboardingForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default OnboardingForm;
