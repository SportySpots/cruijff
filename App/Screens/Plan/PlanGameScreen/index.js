import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Keyboard } from 'react-native';
import Swiper from 'react-native-swiper';
import extend from 'lodash/extend';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import api from '../../../Services/SeedorfApi';
import FormLayout from '../../../Components/PlanGame/FormLayout';
import Footer from '../../../Components/DarkFooter';
import SportDateTimeForm from '../../../Components/PlanGame/SportDateTimeForm/';
import SpotForm from '../../../Components/PlanGame/SpotForm';
import DescriptionForm from '../../../Components/PlanGame/DescriptionForm';
import { formatDate, formatStartTime, formatEndTime } from './utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const DESCRIPTION_MAX_CHARS = 300;

const SLIDES = [
  {
    id: 'sportDateTimeForm',
    Comp: SportDateTimeForm,
    title: 'Plan a game',
    theme: 'white',
    fields: ['sport', 'date', 'time', 'duration', 'capacity'],
    requiredFields: ['sport', 'date', 'time'],
    initState: {
      sport: null,
      date: null,
      time: null,
      duration: null,
      capacity: null,
    },
  },
  {
    id: 'spotForm',
    Comp: SpotForm,
    title: 'Pick a spot',
    theme: 'black',
    fields: ['spot'],
    requiredFields: ['spot'],
    initState: {
      spot: null,
    },
  },
  {
    id: 'descriptionForm',
    Comp: DescriptionForm,
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
class PlanGameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curSlide: 0,
      disabled: false, // disable for buttons after create game submission
    };

    // Attach slide initial state to state
    SLIDES.forEach(({ initState }) => {
      extend(this.state, Object.assign({}, initState));
    });
  }

  handleChange = ({ fieldName, value }) => {
    if (!fieldName) {
      return;
    }

    this.setState(
      { [fieldName]: value },
      // () => { console.log('HANDLE_CHANGE new state', this.state); },
    );
  }

  handleLeave = () => {
    Keyboard.dismiss();

    const { navigation } = this.props;

    Alert.alert(
      I18n.t('Confirm'),
      I18n.t('Are you sure you want to cancel this game?'),
      [
        { text: I18n.t('No'), onPress: () => null, style: 'cancel' },
        { text: I18n.t('Yes'), onPress: () => { navigation.goBack(null); } },
      ],
    );
  }

  handleBack = () => {
    Keyboard.dismiss();

    this.setState(
      prevState => ({ curSlide: prevState.curSlide === 0 ? 0 : prevState.curSlide - 1 }),
      () => { this.swiper.scrollBy(-1); },
    );
  }

  handleNext = async () => {
    Keyboard.dismiss();

    const { navigation, user } = this.props;
    const {
      curSlide,
      sport,
      date,
      time,
      duration,
      capacity,
      spot,
      description,
    } = this.state;

    // If it's NOT the last slide, increment slide counter
    if (curSlide !== SLIDES.length - 1) {
      this.setState(
        prevState => ({ curSlide: prevState.curSlide + 1 }),
        () => { this.swiper.scrollBy(1); },
      );

    // Otherwise, create fomat data and call create game API
    } else {
      // Disable buttons
      this.setState({ disabled: true });

      const username = (
        user &&
        user.claims &&
        user.claims.username
      ) || '';

      // Get startTime and endTime from date, time and duration
      const startDate = formatDate(date); // begining of the selected date (moment object)
      const startTime = formatStartTime(startDate, time); // moment object
      const endTime = duration ? formatEndTime(startTime, duration) : null; // moment object

      console.log('START_DATE', startDate.toISOString()); // '2018-10-06T00:00:00.000Z'
      console.log('START_TIME', startTime.toISOString()); // '2018-10-06T13:15:00.000Z'
      console.log('END_TIME', endTime ? endTime.toISOString() : null); // '2018-10-06T14:15:00.000Z'

      // TODO: replace this with a single endpoint call
      try {
        // Create game
        const result = await api.createGame({ name: `${username}'s game` });
        const gameUUID = result.data.uuid;

        // Set sport
        await api.setGameSport({ gameUUID, sport });

        // Set date and duration
        await api.setGameTimes({
          gameUUID,
          startTime: startTime.toISOString(),
          endTime: endTime ? endTime.toISOString() : null,
        });

        // Set capacity
        await api.setGameCapacity({ gameUUID, capacity: capacity || null });

        // Set spot
        await api.setGameSpot({ gameUUID, spotUUID: spot.uuid });

        // Set description
        await api.setGameDescription({ gameUUID, description });

        // Set game status to 'planned'
        const res = await api.setGameStatus({ gameUUID, status: 'PLANNED' });
        console.log('CREATED GAME', res.data);

        // Lastly, redirect user to share screen
        navigation.navigate('shareGameScreen', { uuid: gameUUID });
      } catch (exc) {
        console.log(exc);
      }

      // Re-enable buttons
      this.setState({ disabled: false });
    }
  }

  get disableNext() {
    const { curSlide } = this.state;

    // Get required fields and restrictions for the current slide
    const { requiredFields, restrictions } = SLIDES[curSlide];

    // Return 'true' if at least on of the required fields isn't set
    for (let i = 0; i < requiredFields.length; i += 1) {
      const fieldName = requiredFields[i];
      if (!this.state[fieldName]) {
        return true;
      }
    }

    // Return 'true' if upper bound is exceeded
    if (restrictions) {
      for (let i = 0; i < restrictions.length; i += 1) {
        const { fieldName, upperBound } = restrictions[i];
        if (this.state[fieldName].length > upperBound) {
          return true;
        }
      }
    }

    // Return 'false' otherwise (all required fields are set)
    return false;
  }

  get showBack() {
    const { curSlide } = this.state;
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

  render() {
    const { curSlide, disabled, ...rest } = this.state;

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
              <FormLayout
                theme={theme}
                title={I18n.t(title)}
                onLeave={this.handleLeave}
              >
                <Comp
                  onChange={this.handleChange}
                  descriptionMaxChars={DESCRIPTION_MAX_CHARS}
                  // Pass down all state values: sport, date, time, etc.
                  {...rest}
                />

              </FormLayout>
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

PlanGameScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    claims: PropTypes.shape({
      username: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = ({ user }) => ({ user });

const withRedux = connect(mapStateToProps, null);

export default withRedux(PlanGameScreen);
