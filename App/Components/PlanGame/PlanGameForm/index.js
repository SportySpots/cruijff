import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import Swiper from 'react-native-swiper';
import extend from 'lodash/extend';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import ClosableLayout from '../../Layouts/ClosableLayout';
import Footer from '../../DarkFooter';
import SportDateTimeSlide from '../../PlanGame/SportDateTimeSlide/';
import SpotSlide from '../../PlanGame/SpotSlide';
import DescriptionSlide from '../../PlanGame/DescriptionSlide';
import { addGlobalRef } from '../../../globalRefs';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const DESCRIPTION_MAX_CHARS = 300;

const SLIDES = [
  {
    id: 'sportDateTimeSlide',
    Comp: SportDateTimeSlide,
    title: 'Plan a game',
    theme: 'white',
    fields: ['sport', 'date', 'time', 'duration', 'capacity'],
    requiredFields: ['sport', 'date', 'time'],
    initState: {
      sport: null,
      date: null,
      time: null,
      // duration: null,
      duration: 90,
      capacity: null,
    },
  },
  {
    id: 'spotSlide',
    Comp: SpotSlide,
    title: 'Pick a spot',
    theme: 'black',
    fields: ['spot'],
    requiredFields: ['spot'],
    initState: {
      spot: null,
    },
  },
  {
    id: 'descriptionSlide',
    Comp: DescriptionSlide,
    title: 'Describe the game',
    theme: 'white',
    fields: ['description'],
    requiredFields: [],
    restrictions: [{ fieldName: 'description', upperBound: DESCRIPTION_MAX_CHARS }],
    initState: {
      description: '',
    },
  },
];
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FullHeight = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PlanGameForm extends React.Component {
  constructor(props) {
    super(props);

    addGlobalRef('PlanGameForm')(this);

    this.state = {
      curSlide: 0,
    };

    // Attach slide's initial state to component's state
    SLIDES.forEach(({ initState }) => {
      extend(this.state, Object.assign({}, initState));
    });
  }

  handleChange = ({ fieldName, value }) => {
    if (!fieldName) { return; }

    const { curSlide } = this.state;

    // Automatically swipe right after the user selects spot
    this.setState({
      [fieldName]: value,
      curSlide: fieldName === 'spot' ? curSlide + 1 : curSlide,
    }, () => {
      if (fieldName === 'spot') {
        this.swiper.scrollBy(1);
      }
    });
  }

  get disableNext() {
    const { curSlide } = this.state;

    // Get required fields and restrictions for the current slide
    const { requiredFields, restrictions } = SLIDES[curSlide];

    // Disable next btn (return 'true') if at least on of the required fields isn't set
    for (let i = 0; i < requiredFields.length; i += 1) {
      const fieldName = requiredFields[i];
      if (!this.state[fieldName]) { // eslint-disable-line
        return true;
      }
    }

    // Disable next btn (return 'true') if restrictions aren't satisfied
    if (restrictions) {
      for (let i = 0; i < restrictions.length; i += 1) {
        const { fieldName, upperBound } = restrictions[i];
        if (this.state[fieldName].length > upperBound) { // eslint-disable-line
          return true;
        }
      }
    }

    // Enable btn otherwise (all required fields are set and restrictions met)
    return false;
  }

  get showBack() {
    const { curSlide } = this.state;
    // Do not back btn for the first slide
    return curSlide !== 0;
  }

  get buttonNextText() {
    const { curSlide } = this.state;

    switch (curSlide) {
      case 0:
        return 'Spot';
      case 1:
        return 'Description';
      case 2:
        return 'Invite';
      default:
        return 'Next';
    }
  }

  handleBack = () => {
    Keyboard.dismiss();

    // Decrease current slider index and slide back one position
    this.setState(
      prevState => ({ curSlide: prevState.curSlide === 0 ? 0 : prevState.curSlide - 1 }),
      () => { this.swiper.scrollBy(-1); },
    );
  }

  handleNext = async () => {
    Keyboard.dismiss();

    const { curSlide } = this.state;

    // If it's NOT the last slide, increment slide counter and slide forward one position
    if (curSlide !== SLIDES.length - 1) {
      this.setState(
        prevState => ({ curSlide: prevState.curSlide + 1 }),
        () => { this.swiper.scrollBy(1); },
      );

    // Otherwise, gather input field values and pass event up to parent component
    } else {
      const {
        username,
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

      // Get field values
      const {
        sport,
        date,
        time,
        duration,
        capacity,
        spot,
        description,
      } = this.state;

      // Pass event up to parent component
      onSuccessHook({
        name: `${username}'s game`,
        sport,
        date,
        time,
        duration,
        capacity,
        spot,
        description,
      });
    }
  }

  render() {
    const { disabled, onLeave } = this.props;
    const { curSlide, ...rest } = this.state;

    return (
      <FullHeight>
        <Swiper
          ref={(swiper) => { this.swiper = swiper; }}
          scrollEnabled={false}
          loop={false}
          showsPagination={false}
        >
          {SLIDES.map(({
            id,
            Comp,
            theme,
            title,
          }) => (
            <FullHeight key={id}>
              <ClosableLayout
                theme={theme}
                title={I18n.t(title)}
                onClose={onLeave}
              >
                <Comp
                  onChange={this.handleChange}
                  descriptionMaxChars={DESCRIPTION_MAX_CHARS}
                  // Pass down all state values: sport, date, time, etc.
                  {...rest}
                />

              </ClosableLayout>
            </FullHeight>
          ))}
        </Swiper>
        <Footer
          numPages={SLIDES.length + 1} // also consider share screen
          currentPage={curSlide}
          onBack={this.handleBack}
          onNext={this.handleNext}
          disableNext={this.disableNext || disabled}
          disableBack={disabled}
          showBack={this.showBack}
          buttonNextText={I18n.t(this.buttonNextText)}
        />
      </FullHeight>
    );
  }
}

PlanGameForm.propTypes = {
  username: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  // onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  onLeave: PropTypes.func,
};

PlanGameForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  // onClientErrorHook: () => {},
  onSuccessHook: () => {},
  onLeave: () => {},
};

export default PlanGameForm;
