import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, FlatList, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import styled from 'styled-components/native';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import { addGlobalRef } from '../../../globalRefs';
import ClosableLayout from '../../Layouts/ClosableLayout';
import AbsoluteCenteredActivityIndicator from '../../Common/AbsoluteCenteredActivityIndicator';
import Footer from '../../Common/DarkFooter';
import SportDateTimeSlide, {
  INIT_STATE as SPORT_DATE_TIME_INIT_STATE,
  INIT_ERRORS as SPORT_DATE_TIME_INIT_ERRORS,
} from '../SportDateTimeSlide';
import SpotSlide, {
  INIT_STATE as SPOT_INIT_STATE,
  INIT_ERRORS as SPOT_INIT_ERRORS,
} from '../SpotSlide';
import TitleDescriptionSlide, {
  getInitState as titleDescriptionGetInitState,
  INIT_ERRORS as TITLE_DESCRIPTION_INIT_ERRORS,
} from '../TitleDescriptionSlide';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const SLIDES = [
  {
    id: 'sportDateTimeSlide',
    order: 0,
    Comp: SportDateTimeSlide,
    section: SportDateTimeSlide.title,
    requiredFields: SportDateTimeSlide.requiredFields || [],
  },
  {
    id: 'spotSlide',
    order: 1,
    Comp: SpotSlide,
    section: SpotSlide.title,
    requiredFields: SpotSlide.requiredFields || [],
  },
  {
    id: 'titleDescriptionSlide',
    order: 2,
    Comp: TitleDescriptionSlide,
    section: TitleDescriptionSlide.title,
    requiredFields: TitleDescriptionSlide.requiredFields || [],
  },
];

let INIT_STATE;

const getInitState = username => ({
  ...cloneDeep(SPORT_DATE_TIME_INIT_STATE),
  ...cloneDeep(SPOT_INIT_STATE),
  ...cloneDeep(titleDescriptionGetInitState(username)),
});

const INIT_ERRORS = {
  ...cloneDeep(SPORT_DATE_TIME_INIT_ERRORS),
  ...cloneDeep(SPOT_INIT_ERRORS),
  ...cloneDeep(TITLE_DESCRIPTION_INIT_ERRORS),
};

const { width: WINDOW_WIDTH } = Dimensions.get('window');
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Relative = styled.View`
  flex: 1; /* full height */
  position: relative;
`;
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PlanGameForm extends React.Component {
  constructor(props) {
    super(props);

    addGlobalRef('PlanGameForm')(this);

    const { username } = props;

    INIT_STATE = getInitState(username);

    this.state = {
      curSlide: 0,
      ...cloneDeep(INIT_STATE),
      errors: cloneDeep(INIT_ERRORS),
    };

    // console.log('INIT STATE', this.state);
  }

  componentWillReceiveProps({ errors }) {
    // Display (server side) errors coming from parent component
    if (errors) {
      this.setState({
        errors: {
          ...cloneDeep(INIT_ERRORS),
          ...errors,
        },
      });
    }
  }

  clearErrors = () => {
    this.setState({ errors: cloneDeep(INIT_ERRORS) });
  };

  handleChange = ({ fieldName, value }) => {
    const { errors } = this.state;

    this.setState({
      [fieldName]: value,
      errors: ErrorHandling.clearErrors(errors, fieldName),
    });
  }

  validateFields = (fields) => {
    const { curSlide } = this.state;

    return {
      ...cloneDeep(INIT_ERRORS),
      ...(curSlide === 0 ? SportDateTimeSlide.validateFields(fields) : {}),
      // Spot
      ...(curSlide === 2 ? TitleDescriptionSlide.validateFields(fields) : {}),
    };
  }

  get nSlides() {
    let counter = SLIDES.length;

    SLIDES.forEach((s, index) => {
      // Get required fields for the current slide
      const { requiredFields } = SLIDES[index];
      let pass = true;

      // Disable next btn (return 'true') if at least on of the required fields isn't set
      if (requiredFields) {
        for (let i = 0; i < requiredFields.length; i += 1) {
          const fieldName = requiredFields[i];
          if (!this.state[fieldName]) { // eslint-disable-line
            pass = false;
          }
        }
      }

      if (!pass) {
        counter -= 1;
      }
    });

    return counter;
  }

  get disableNext() {
  // disableNext = (index) => {
    const { curSlide } = this.state;

    // Get required fields for the current slide
    const { requiredFields } = SLIDES[curSlide];

    // Disable next btn (return 'true') if at least on of the required fields isn't set
    if (requiredFields) {
      for (let i = 0; i < requiredFields.length; i += 1) {
        const fieldName = requiredFields[i];
        if (!this.state[fieldName]) { // eslint-disable-line
          return true;
        }
      }
    }

    // Enable btn otherwise (all required fields are set)
    return false;
  }

  get showBack() {
    const { curSlide } = this.state;
    // Don't show back btn for the first slide
    return curSlide !== 0;
  }

  get buttonNextText() {
    const { curSlide } = this.state;

    switch (curSlide) {
      case 0:
        return SportDateTimeSlide.nextBtnLabel;
      case 1:
        return SpotSlide.nextBtnLabel;
      case 2:
        return TitleDescriptionSlide.nextBtnLabel;
      default:
        return 'NEXT';
    }
  }

  handleScroll = (evt) => {
    Keyboard.dismiss();

    const nextSlide = Math.round(evt.nativeEvent.contentOffset.x / WINDOW_WIDTH);
    this.setState({ curSlide: nextSlide });
  }

  handleBack = () => {
    Keyboard.dismiss();

    const { curSlide } = this.state;

    // If it's NOT the first slide, slide backwards one position
    if (curSlide !== 0) {
      // refs are null when doing shallow tests
      if (this.swiper) {
        this.swiper.scrollToIndex({ index: curSlide - 1 });
      }
    }
  }

  handleNext = () => {
    Keyboard.dismiss();
    console.log('handle next');

    const { curSlide } = this.state;

    firebase.analytics().logEvent(`plan_activity_footer_next_btn_press_idx_${curSlide}`);

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields(this.state);

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      return;
    }

    // If it's NOT the last slide, slide forward one position
    if (curSlide !== SLIDES.length - 1) {
      // refs are null when doing shallow tests
      if (this.swiper) {
        this.swiper.scrollToIndex({ index: curSlide + 1 });
      }
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
    const { disabled, onLeave } = this.props;
    const { curSlide, ...rest } = this.state;

    // Load slides dinamically so that we can prevent the user to scroll right
    // when the next button is disabled
    const FILTERED_SLIDES = cloneDeep(SLIDES).slice(0, this.nSlides);

    return (
      <Relative>
        {disabled && (
          <AbsoluteCenteredActivityIndicator secondary />
        )}
        <FlatList
          ref={(swiper) => { this.swiper = swiper; }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={this.handleScroll}
          data={FILTERED_SLIDES}
          extraData={FILTERED_SLIDES.length}
          keyExtractor={item => item.id}
          renderItem={({ item: { id, Comp, section } }) => (
            <FlexOne key={id} style={{ width: WINDOW_WIDTH }}>
              <ClosableLayout
                theme="white"
                title={I18n.t(section)}
                onClose={onLeave}
              >
                <Comp
                  onChange={this.handleChange}
                  // Pass down all state values: sport, date, time, etc.
                  {...rest}
                />
              </ClosableLayout>
            </FlexOne>
          )}
        />
        <Footer
          numPages={SLIDES.length}
          currentPage={curSlide}
          onBack={this.handleBack}
          onNext={this.handleNext}
          disableNext={this.disableNext || disabled}
          disableBack={disabled}
          showBack={this.showBack}
          buttonNextText={I18n.t(this.buttonNextText)}
        />
      </Relative>
    );
  }
}

PlanGameForm.propTypes = {
  username: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  // onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  onLeave: PropTypes.func,
};

PlanGameForm.defaultProps = {
  disabled: false,
  errors: null,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  // onClientErrorHook: () => {},
  onSuccessHook: () => {},
  onLeave: () => {},
};

export default PlanGameForm;
