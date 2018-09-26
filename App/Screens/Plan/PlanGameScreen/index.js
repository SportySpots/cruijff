import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Keyboard } from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import extend from 'lodash/extend';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import api from '../../../Services/SeedorfApi';
import FormLayout from '../../../Components/PlanGame/FormLayout';
import Footer from '../../../Components/DarkFooter';
import SportDateTimeForm from '../../../Components/PlanGame/SportDateTimeForm/';
import SpotForm from '../../../Components/PlanGame/SpotForm';
import DescriptionForm from '../../../Components/PlanGame/DescriptionForm';
import dateStringToTimeString from './utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
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
      capacity: '',
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
    };

    // Attach slides fields to state
    SLIDES.forEach(({ initState }) => {
      extend(this.state, Object.assign({}, initState));
    });
  }

  // TODO: move this to utils.js and return the formatted values
  setDate = async (date) => {
    const { start_time, end_time } = this.state;
    const startTime = moment(`${date}T${moment(start_time).format('HH:mm:ss')}`).toISOString();
    const endTime = moment(`${date}T${moment(end_time).format('HH:mm:ss')}`).toISOString();
    /* const result = await api.setGameTimes({
      gameUUID: this.gameUUID,
      startTime,
      endTime,
    }); */
    // if (result.ok) {
    this.setState(
      { start_time: startTime, end_time: endTime },
      () => { console.log(this.state); },
    );
    // }
  };

  // TODO: move this to utils.js and return the formatted values
  setStartTime = async (date) => {
    const { start_time } = this.state;
    console.log(
      'date', date,
      'start_time', start_time,
    );
    const timeString = `${dateStringToTimeString(date)}:00`;
    const startTime = moment(`${moment(start_time).format('YYYY-MM-DD')}T${timeString}`).toISOString();
    /* const result = await api.setGameTimes({
      gameUUID: this.gameUUID,
      startTime,
      endTime: this.state.game.end_time,
    }); */
    // if (result.ok) {
    this.setState(
      { start_time: startTime },
      () => { console.log(this.state); },
    );
    // }
  };

  // TODO: move this to utils.js and return the formatted values
  setEndTime = async (date) => {
    const { end_time } = this.state;
    const timeString = `${dateStringToTimeString(date)}:00`;
    const endTime = moment(`${moment(end_time).format('YYYY-MM-DD')}T${timeString}`).toISOString();
    /* const result = await api.setGameTimes({
      gameUUID: this.gameUUID,
      endTime,
      startTime: this.state.game.start_time,
    }); */
    // if (result.ok) {
    this.setState(
      { end_time: endTime },
      () => { console.log(this.state); },
    );
    // }
  };

  handleChange = ({ fieldName, value }) => {
    if (!fieldName || !value) {
      return;
    }

    console.log(
      '\n\nhandleChange',
      'fieldName', fieldName,
      'value', value,
    );

    let formattedValue = value;
    switch (fieldName) {
      case 'date':
        // TODO
        formattedValue = this.setDate(value);
        break;
      case 'time':
        formattedValue = this.setStartTime(value);
        break;
      case 'duration':
        formattedValue = this.setEndTime(value);
        break;
      default:
        formattedValue = value;
    }

    console.log('formattedValue', formattedValue);

    this.setState(
      { [fieldName]: formattedValue },
      () => { console.log(this.state); },
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

    // If it's NOT the last slide
    if (curSlide !== SLIDES.length - 1) {
      this.setState(
        prevState => ({ curSlide: prevState.curSlide + 1 }),
        () => { this.swiper.scrollBy(1); },
      );
    } else {
      const username = (
        user &&
        user.claims &&
        user.claims.username
      ) || '';

      let gameUUID;

      // TODO: replace this with a single endpoint call
      try {
        // Create game
        const result = await api.createGame({ name: `${username}'s game` });
        gameUUID = result.data.uuid;

        // Set sport
        await api.setGameSport({ gameUUID, sport });

        // Set date and duration
        await api.setGameTimes({
          gameUUID,
          startTime: date,
          endTime: date + duration,
        });

        // Set capacity
        await api.setGameCapacity({ gameUUID, capacity: capacity || null });

        // Set spot
        await api.setGameSpot({ gameUUID, spotUUID: spot.uuid });

        // Set description
        await api.setGameDescription({ gameUUID, description });

        // Set game status to 'planned'
        await api.setGameStatus({ gameUUID, status: 'planned' });

        // Lastly, redirect user to share screen
        this.props.navigation.navigate('shareGameScreen', { uuid: gameUUID });
      } catch (exc) {
        console.log(exc);
      }
    }
  }

  get disableNext() {
    const { curSlide } = this.state;

    // Last slide (share) is always anabled
    if (curSlide === SLIDES.length - 1) {
      return false;
    }

    // Return 'true' if at least on of the required fields isn't set
    const { requiredFields } = SLIDES[curSlide];
    console.log('REQUIRED_FIELDS', requiredFields);
    for (let i = 0; i < requiredFields.length; i += 1) {
      const fieldName = requiredFields[i];
      console.log('FIELD_NAME', fieldName);
      console.log('!this.state[fieldName]', !this.state[fieldName]);
      if (!this.state[fieldName]) {
        return true;
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
    const { curSlide, ...rest } = this.state;

    console.log('STATE', rest);

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
          disableNext={this.disableNext}
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
