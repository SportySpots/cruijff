import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import styled from 'styled-components';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n/index';
import ClosableLayout from '../../Layouts/ClosableLayout';
import Footer from '../../DarkFooter';
import SportDateTimeSlide from '../SportDateTimeSlide';
import SpotSlide from '../SpotSlide';
import DescriptionSlide from '../DescriptionSlide';
import { addGlobalRef } from '../../../globalRefs';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const DESCRIPTION_MAX_CHARS = 10; // 2000;

let SLIDES = [];
const genSlides = ({ username }) => [
  {
    id: 'sportDateTimeSlide',
    Comp: SportDateTimeSlide,
    section: 'Plan a game',
    theme: 'white',
    fields: ['sport', 'date', 'time', 'duration', 'capacity'],
    requiredFields: ['sport', 'date', 'time'],
    errors: {
      dateTime: [],
    },
    initState: {
      sport: null,
      date: null,
      time: null,
      duration: 90, // null,
      capacity: null,
    },
    validateFields: ({ date, time }) => {
      const errors = { dateTime: [] };
      if (date && time) {
        const hours = time.hours();
        const minutes = time.minutes();
        const dateTime = date.clone().add(hours, 'hours').add(minutes, 'minutes');
        const now = moment();

        if (dateTime.diff(now) < 0) {
          errors.dateTime.push('Please, select a valid date and time');
        }
      }
      return errors;
    },
  },
  {
    id: 'spotSlide',
    Comp: SpotSlide,
    section: 'Pick a spot',
    theme: 'black',
    fields: ['spot'],
    requiredFields: ['spot'],
    // errors: {},
    initState: {
      spot: null,
    },
    // validateFields: () => ({}),
  },
  {
    id: 'descriptionSlide',
    Comp: DescriptionSlide,
    section: 'Describe the game',
    theme: 'white',
    fields: ['title', 'description'],
    requiredFields: [],
    errors: {
      description: [],
    },
    initState: {
      title: `${username}'s game`,
      description: '',
    },
    validateFields: ({ description }) => {
      const errors = { description: [] };
      if (description.length > DESCRIPTION_MAX_CHARS) {
        errors.description.push('Description is too long');
      }
      return errors;
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

    const { username } = props;
    SLIDES = genSlides({ username });

    this.state = {
      curSlide: 0,
      errors: this.initErrors(),
    };

    // Attach slide's initial state to component's state
    SLIDES.forEach(({ initState }) => {
      extend(this.state, Object.assign({}, initState));
    });

    console.log('INIT STATE', this.state);
  }

  initErrors = () => {
    const errs = {};
    SLIDES.forEach(({ errors }) => {
      if (errors) {
        extend(errs, Object.assign({}, errors));
      }
    });
    console.log('INIT ERRORS', errs);
    return errs;
  }

  clearErrors = () => {
    this.setState({ errors: this.initErrors() });
  };

  handleChange = ({ fieldName, value }) => {
    if (!fieldName) { return; }

    const { curSlide, errors } = this.state;

    // Automatically swipe right after the user selects spot
    this.setState({
      [fieldName]: value,
      errors: (fieldName === 'date' || fieldName === 'time')
        ? ErrorHandling.clearErrors(errors, 'dateTime')
        : ErrorHandling.clearErrors(errors, fieldName),
      curSlide: fieldName === 'spot' ? curSlide + 1 : curSlide,
    }, () => {
      if (fieldName === 'spot') {
        this.swiper.scrollBy(1);
      }
      console.log('STATE', this.state);
    });
  }

  validateFields = (errorFields) => {
    // Initialize errors
    const errors = this.initErrors();

    SLIDES.forEach(({ validateFields }) => {
      if (validateFields && typeof validateFields === 'function') {
        extend(errors, Object.assign({}, validateFields(errorFields)));
      }
    });

    return errors;
  };

  get disableNext() {
    const { curSlide } = this.state;

    // Get required fields for the current slide
    const { requiredFields } = SLIDES[curSlide];

    // Disable next btn (return 'true') if at least on of the required fields isn't set
    for (let i = 0; i < requiredFields.length; i += 1) {
      const fieldName = requiredFields[i];
      if (!this.state[fieldName]) { // eslint-disable-line
        return true;
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

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields(pick(this.state, ['date', 'time', 'description']));

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      return;
    }

    // If it's NOT the last slide, increment slide counter and slide forward one position
    if (curSlide !== SLIDES.length - 1) {
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
    onSuccessHook(pick(this.state, [
      'title',
      'sport',
      'date',
      'time',
      'duration',
      'capacity',
      'spot',
      'description',
    ]));
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
            section,
          }) => (
            <FullHeight key={id}>
              <ClosableLayout
                theme={theme}
                title={I18n.t(section)}
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
