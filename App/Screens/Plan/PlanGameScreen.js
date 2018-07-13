import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Keyboard } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import moment from 'moment';
import styled from 'styled-components';
import { client } from '../../GraphQL';
import GET_GAME_PLAN from '../../GraphQL/Games/Queries/GET_GAME_PLAN';
import I18n from '../../I18n/index';
import api from '../../Services/SeedorfApi';
import Colors from '../../Themes/Colors';
import planGameAction from '../../Redux/PlanGameRedux';
import Footer from '../../Components/DarkFooter';
import FormScreens from '../../Components/PlanGame/FormScreens';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Outer = styled.View`
  flex: 1;
  background-color: ${Colors.primaryGreen};
  padding-top: 48;
`;
//------------------------------------------------------------------------------
const Inner = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const dateStringToTimeString = (dateString) => {
  const date = new Date(dateString);
  return (
    `${(date.getHours() < 10 ? '0' : '') +
    date.getHours()
    }:${
      date.getMinutes() < 10 ? '0' : ''
    }${date.getMinutes()}`
  );
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PlanGameScreen extends React.Component {
  state = {
    curPage: 0,
    // Game fields
    uuid: '',
    name: '',
    status: '',
    start_time: '',
    end_time: '',
    capacity: '',
    description: '',
    sport: {
      uuid: '',
      id: '',
      name: '',
      category: '',
    },
    spot: {
      uuid: '',
      name: '',
    },
  }

  async componentWillMount() {
    const { user, navigation } = this.props;

    // In case gameUUID is already set, it means we are editing and existing
    // activity
    const gameUUID = (
      navigation.state &&
      navigation.state.params &&
      navigation.state.params.uuid
    );

    if (gameUUID && gameUUID.length > 0) {
      this.gameUUID = gameUUID;
      this.queryGame(gameUUID);
      return;
    }

    // In case gameUUID is NOT set, this means the user is trying to create a
    // new activity
    const username = (
      user &&
      user.claims &&
      user.claims.username
    ) || '';

    try {
      const result = await api.createGame({ name: `${username}'s game` });
      this.gameUUID = result.data.uuid;
      // this.setState({ uuid: result.data.uuid });
      this.queryGame(result.data.uuid);
    } catch (exc) {
      console.log(exc);
    }
  }

  queryGame = async (uuid) => {
    try {
      const result = await client.query({
        query: GET_GAME_PLAN,
        variables: { uuid },
      });
      this.setState({ ...result.data.game });
    } catch (exc) {
      console.log(exc);
    }
  }

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

    // TODO: call api for the given fieldName
    switch (fieldName) {
      case 'sport':
      case 'capacity':
        this.setState(
          { [fieldName]: value },
          () => { console.log(this.state); },
        );
        break;
      case 'date':
        this.setDate(value);
        break;
      case 'startTime':
        this.setStartTime(value);
        break;
      case 'endTime':
        this.setEndTime(value);
        break;
      default:
        throw new Error(404, 'Unknown fieldName');
    }
  }

  handleBack = () => {
    Keyboard.dismiss();

    Alert.alert(
      I18n.t('Confirm'),
      I18n.t('Are you sure you want to cancel this game?'),
      [
        { text: I18n.t('No'), onPress: () => null, style: 'cancel' },
        { text: I18n.t('Yes'), onPress: () => { this.props.navigation.goBack(null); } },
      ],
    );
  }

  handleNext = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('pickSpot', {
      uuid: this.gameUUID,
      sportUUID: this.state.game.sport.uuid,
      sportCategory: this.state.game.sport.category,
    });
  }

  get disableNext() {
    // TODO:
    // curPage = 0 --> !this.state.game.start_time || !this.state.game.end_time || !this.state.game.sport
    return true;
  }

  render() {
    const { user } = this.props;
    const { uuid } = this.state;

    // Wait for game to be set before showing form
    if (!uuid || uuid.length === 0) {
      return null;
    }

    return (
      <Outer>
        <Inner>
          <FormScreens
            {...this.state} // TODO: pick only required fields or use state = { curPage, game }
            user={user}
            onChange={this.handleChange}
          />
        </Inner>
        <Footer
          numPages={4}
          currentPage={0}
          onBack={this.handleBack}
          onNext={this.handleNext}
          disableNext={this.disableNext}
        />
      </Outer>
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

const mapStateToProps = state => ({
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
);

export default enhance(PlanGameScreen);
