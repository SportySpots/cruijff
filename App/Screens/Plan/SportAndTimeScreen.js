import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import moment from 'moment';
import {
  Alert,
  FlatList,
  Keyboard,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Footer from '../../Components/DarkFooter/index';
import Text from '../../Components/Common/Text';
import { client } from '../../GraphQL/index';
import withQuery from '../../GraphQL/withQuery';
import I18n from '../../I18n/index';
import api from '../../Services/SeedorfApi';
import Colors from '../../Themes/Colors';


const Field = ({ value, onPress }) => (
  <TouchableOpacity onPress={() => onPress && onPress()}>
    <View style={styles.fieldContainer}>
      <View style={styles.fieldBlock}>
        <Text.M style={styles.fieldValue}>{value}</Text.M>
      </View>
      <Icon size={24} name="keyboard-arrow-down" />
    </View>
  </TouchableOpacity>
);

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ModalInnerContainer = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  margin: 36px;
  padding: 8px;
`;

const SportItemContainer = styled.View`
  height: 44px;
  justify-content: center;
`;

const SportModal = ({ visible, onSelect }) => {
  const Contents = withQuery(gql`
    {
      sports {
        uuid
        name
        category
      }
    }
  `)(({ data }) => (
    <ModalContainer>
      <ModalInnerContainer>
        <Text.L>{I18n.t('Choose sport')}</Text.L>
        <FlatList
          keyExtractor={item => item.uuid}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelect(item)}>
              <SportItemContainer>
                <Text.M>{I18n.t(item.name)}</Text.M>
              </SportItemContainer>
            </TouchableOpacity>
          )}
          data={data.sports}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: Colors.black54 }} />
          )}
        />
      </ModalInnerContainer>
    </ModalContainer>
  ));

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={() => onSelect(null)}
      transparent
    >
      <Contents />
    </Modal>
  );
};

const DateModal = ({ game, visible, onSelect }) => (
  <Modal visible={visible} animationType="fade" onRequestClose={() => onSelect(null)} transparent>
    <View style={styles.modalContainer}>
      <View style={styles.modalInnerContainer}>
        <Text.L>{I18n.t('Select a date')}</Text.L>
        <Calendar
          current={new Date().toISOString().slice(0, 10)}
          minDate={new Date().toISOString().slice(0, 10)}
          onDayPress={day => onSelect(day.dateString)}
        />
      </View>
    </View>
  </Modal>
);

const timeStringToDate = (timeString) => {
  const hours = timeString.split(':')[0];
  const minutes = timeString.split(':')[1];
  return new Date(Date.UTC(2016, 6, 6, hours, minutes, 0));
};

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

class SportAndTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modals: {
        sport: false,
        date: false,
        timeStart: false,
        timeEnd: false,
      },
      capacityField: '',
      game: null,
    };
  }

  /**
    * @summary Create new game
    */
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
      this.refreshGame();
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
      this.refreshGame();
    } catch (exc) {
      console.log(exc);
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  refreshGame = async () => {
    try {
      const result = await client.query({
        query: gql`
          {
            game(uuid: "${this.gameUUID}") {
              uuid
              start_time
              end_time
              sport { uuid, name, category }
              capacity
            }
          }
        `,
      });
      this.setState({
        game: result.data.game,
        capacityField: result.data.game.capacity,
      });
    } catch (e) {
      console.log(e);
    }
  };

  openModal(modalName) {
    this.setState({ modals: { ...this.state.modals, [modalName]: true } });
  }
  closeModal(modalName) {
    this.setState({ modals: { ...this.state.modals, [modalName]: false } });
  }

  onBack = () => {
    Keyboard.dismiss();

    Alert.alert(
      I18n.t('Confirm'),
      I18n.t('Are you sure you want to cancel this game?'),
      [
        { text: I18n.t('No'), onPress: () => null, style: 'cancel' },
        { text: I18n.t('Yes'), onPress: () => { this.props.navigation.goBack(null); } },
      ],
    );
  };

  onNext = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('pickSpot', {
      uuid: this.gameUUID,
      sportUUID: this.state.game.sport.uuid,
      sportCategory: this.state.game.sport.category,
    });
  };

  setSport = async (sport) => {
    this.closeModal('sport');
    // request goes through, but response is unexpected from the perspective of Apollo Client
    try {
      const result = await api.setGameSport({
        gameUUID: this.gameUUID,
        sport,
      });
    } catch (e) {
      console.log(e);
    }
    this.setState({ game: { ...this.state.game, sport } });
  };

  setDate = async (date) => {
    this.closeModal('date');
    const startTime = moment(`${date}T${moment(this.state.game.start_time).format('HH:mm:ss')}`).toISOString();
    const endTime = moment(`${date}T${moment(this.state.game.end_time).format('HH:mm:ss')}`).toISOString();
    const result = await api.setGameTimes({
      gameUUID: this.gameUUID,
      startTime,
      endTime,
    });
    if (result.ok) {
      this.setState({
        game: {
          ...this.state.game,
          start_time: startTime,
          end_time: endTime,
        },
      });
    }
  };

  setStartTime = async (date) => {
    this.closeModal('timeStart');
    const timeString = `${dateStringToTimeString(date)}:00`;
    const startTime = moment(`${moment(this.state.game.start_time).format('YYYY-MM-DD')}T${timeString}`).toISOString();
    const result = await api.setGameTimes({
      gameUUID: this.gameUUID,
      startTime,
      endTime: this.state.game.end_time,
    });
    if (result.ok) {
      this.setState({
        game: { ...this.state.game, start_time: startTime },
      });
    }
  };

  setEndTime = async (date) => {
    this.closeModal('timeEnd');
    const timeString = `${dateStringToTimeString(date)}:00`;
    const endTime = moment(`${moment(this.state.game.end_time).format('YYYY-MM-DD')}T${timeString}`).toISOString();
    const result = await api.setGameTimes({
      gameUUID: this.gameUUID,
      endTime,
      startTime: this.state.game.start_time,
    });
    if (result.ok) {
      this.setState({
        game: { ...this.state.game, end_time: endTime },
      });
    }
  };

  setCapacity = async () => {
    const { capacityField } = this.state;

    let result;
    try {
      result = await api.setGameCapacity({
        gameUUID: this.gameUUID,
        capacity: capacityField || null,
      });
    } catch (exc) {
      console.log(exc);
    }

    if (result.ok) {
      this.setState({
        game: { ...this.state.game, capacity: capacityField },
      });
    }
  };

  render() {
    const { game } = this.state;

    if (!game) {
      return null;
    }

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={{ paddingHorizontal: 16 }}>
            <SportModal
              visible={this.state.modals.sport}
              value={game.sport}
              onSelect={this.setSport}
            />
            <DateModal
              game={game}
              visible={this.state.modals.date}
              onSelect={this.setDate}
            />
            <DateTimePicker
              mode="time"
              isVisible={this.state.modals.timeStart}
              date={
                game.timeStart
                  ? timeStringToDate(game.start_time)
                  : timeStringToDate('12:00')
              }
              onConfirm={this.setStartTime}
              onCancel={() => {
                this.closeModal('timeStart');
              }}
            />
            <DateTimePicker
              mode="time"
              isVisible={this.state.modals.timeEnd}
              date={
                game.timeEnd
                  ? timeStringToDate(game.end_time)
                  : timeStringToDate('12:00')
              }
              onConfirm={this.setEndTime}
              onCancel={() => {
                this.closeModal('timeEnd');
              }}
            />

            <Text.L style={styles.title}>{I18n.t('Plan a game')}</Text.L>
            <View style={[styles.horizontal, { flex: 1, flexWrap: 'wrap' }]}>
              <Text.M style={styles.text}>{I18n.t('I want to play')}</Text.M>
              <Field
                value={
                  game.sport ? I18n.t(game.sport.name) : I18n.t('Select')
                }
                onPress={() => this.openModal('sport')}
              />
            </View>
            <View style={styles.horizontal}>
              <Text.M style={styles.text}>{I18n.t('on')}</Text.M>
              <Field
                value={moment(game.start_time).format('DD-MM') || I18n.t('Select')}
                onPress={() => this.openModal('date')}
              />
            </View>
            <View style={styles.horizontal}>
              <Text.M style={styles.text}>{I18n.t('from')}</Text.M>
              <Field
                value={moment(game.start_time).format('HH:mm') || I18n.t('Select')}
                onPress={() => this.openModal('timeStart')}
              />
              <Text.M style={styles.text}>{I18n.t('to')}</Text.M>
              <Field
                value={moment(game.end_time).format('HH:mm') || I18n.t('Select')}
                onPress={() => this.openModal('timeEnd')}
              />
            </View>
            <View style={styles.horizontal}>
              <Text.M style={styles.text}>{I18n.t('with')}</Text.M>
              <TextInput
                ref={ref => this.capacityField = ref }
                keyboardType="numeric"
                underlineColorAndroid={Colors.white}
                style={{ flex: 0.20, fontSize: 24, marginLeft: 8 }}
                defaultValue={(game.capacity && game.capacity.toString()) || ''}
                onChangeText={val => this.setState({ capacityField: val })}
                onBlur={this.setCapacity}
              />
              <Text.M style={styles.text}> {I18n.t('people')}</Text.M>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Footer
          numPages={4}
          currentPage={0}
          onBack={this.onBack}
          onNext={this.onNext}
          disableNext={
            !game.start_time || !game.end_time || !game.sport
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    height: '100%',
  },
  container: {
    backgroundColor: Colors.primaryGreen,
    flex: 1,
    paddingTop: 48,
  },
  horizontal: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    marginBottom: 32,
    /* fontSize: 48, */
  },
  text: {
    color: Colors.white,
    fontSize: 24,
  },
  fieldContainer: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldBlock: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    paddingHorizontal: 8,
  },
  fieldValue: {
    fontSize: 28,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.8)',
  },
  modalInnerContainer: {
    backgroundColor: Colors.white,
    flex: 1,
    margin: 36,
    padding: 8,
  },
});

SportAndTime.propTypes = {
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

export default SportAndTime;

/*
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
    }); //
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
    }); //
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
    }); //
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
    console.log('handleNext!!!!1');

    const { navigation } = this.props;
    const { curPage, uuid } = this.state;

    switch (curPage) {
      case 0: // 'sportTime'
        console.log('PICK SPOT');
        console.log('navigation', navigation);
        // navigation.popToTop();
        // navigation.replace('sportTime');
        navigation.replace('pickSpot');
        break;
      case 1: // 'pickSpot'
        console.log('DESCRIPTION');
        navigation.navigate('description');
        break;
      case 2: // 'description'
        navigation.navigate('created');
        break;
      case 3: // 'created'
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
        break;
      default:
        throw new Error(404, 'Unknown page');
    }
    /* this.props.navigation.navigate('pickSpot', {
      uuid: this.gameUUID,
      sportUUID: this.state.game.sport.uuid,
      sportCategory: this.state.game.sport.category,
    }); //
  }

  get disableNext() {
    const {
      curPage,
      sport,
      start_time,
      end_time,
    } = this.state;

    switch (curPage) {
      case 0:
        return !start_time || !end_time || !sport;
      default:
        return true;
    }
  }

  render() {
    const { user } = this.props;
    const { curPage, uuid } = this.state;

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
            navigation={this.props.navigation}
          />
        </Inner>
        <Footer
          numPages={4}
          currentPage={curPage}
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
*/
