import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import extend from 'lodash/extend';
import pick from 'lodash/pick';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import api from '../../../Services/SeedorfApi';
import Colors from '../../../Themes/Colors';
import FormLayout from '../../../Components/PlanGame/FormLayout';
import Footer from '../../../Components/DarkFooter';
import SportDateTimeForm from '../../../Components/PlanGame/SportDateTimeForm/';
import SpotForm from '../../../Components/PlanGame/SpotForm';
import DescriptionForm from '../../../Components/PlanGame/DescriptionForm';
import ShareForm from '../../../Components/PlanGame/ShareForm';
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
    // TODO: probably sportUuid or something
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
    title: 'Pick a Spot',
    theme: 'black',
    // TODO: probably spotUuid or something
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
  // TODO: share is probably a different screen. Pass game uuid via navigation?
  {
    id: 'shareForm',
    Comp: ShareForm,
    title: 'Plan a game',
    theme: 'white',
    fields: ['gameUuid', 'share'],
    requiredFields: ['gameUuid'],
    initState: {
      share: false,
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
      extend(this.state, ...initState);
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

  handleNext = () => {
    Keyboard.dismiss();

    const { navigation } = this.props;
    const { curSlide } = this.state;

    // If it's the last slide
    if (curSlide === 3) { // TODO: use slides.length instaed
      // TODO: call api create game and redirect after successful response
      const uuid = 'Some uuid';
      // Go back to the begining of the stack
      navigation.popToTop();
      // Go back to main tabs navigation
      navigation.goBack(null);
      // Go to games list screen
      navigation.navigate('GamesListScreen');
      // Reset stack (otherwise we'll get a back arrow for some wired reason :S)
      navigation.dispatch(new NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'GamesListScreen',
          }),
        ],
      }));
      // Finally go to recently created game
      navigation.navigate('GameDetailsScreen', { uuid });
    } else {
      this.setState(
        prevState => ({ curSlide: prevState.curSlide + 1 }),
        () => { this.swiper.scrollBy(1); },
      );
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
    for (let i = 0; i < requiredFields.length - 1; i += 1) {
      const fieldName = requiredFields[i];
      if (!this.state[fieldName]) {
        return true;
      }
    }

    // Return 'false' otherwise (all required fields are set)
    return false;
  }

  render() {
    const { curSlide } = this.state;

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
            <FullHeight>
              <FormLayout
                key={id}
                theme={theme}
                title={I18n.t(title)}
                onLeave={this.handleLeave}
              >
                <Comp
                  onChange={this.handleChange}
                  {...this.state}
                />

              </FormLayout>
            </FullHeight>
          ))}
        </Swiper>
        <Footer
          numPages={SLIDES.length}
          currentPage={curSlide}
          onBack={this.handleBack}
          onNext={this.handleNext}
          disableNext={this.disableNext}
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
  /* user: PropTypes.shape({
    claims: PropTypes.shape({
      username: PropTypes.string,
    }).isRequired,
  }).isRequired, */
};

/* const mapStateToProps = state => ({
  gameDetails: state.plan.gameDetails,
  nav: state.nav,
  user: state.user,
});

const dispatchToProps = {
  clear: planGameAction.clearGame,
  setGameDetailField: planGameAction.setGameDetailField,
  navigate: NavigationActions.navigate,
};

const withRedux = connect(mapStateToProps, dispatchToProps);

const enhance = compose(
  withNavigation,
  withRedux,
); */

export default PlanGameScreen;
