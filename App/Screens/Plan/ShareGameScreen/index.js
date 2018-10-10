import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Keyboard, Platform, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components';
import I18n from '../../../I18n';
import api from '../../../Services/SeedorfApi';
import FormLayout from '../../../Components/PlanGame/FormLayout';
import Footer from '../../../Components/DarkFooter';
import ShareForm from '../../../Components/PlanGame/ShareForm';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FullHeight = styled.View`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ShareGameScreen extends React.Component {
  state = {
    isPublic: true,
  }

  // Handle android back button press
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleLeave);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.handleLeave);
    }
  }

  handleLeave = () => {
    Keyboard.dismiss();

    const { navigation } = this.props;

    Alert.alert(
      I18n.t('Confirm'),
      I18n.t('Are you sure you want to cancel this game?'),
      [
        { text: I18n.t('No'), onPress: () => null, style: 'cancel' },
        {
          text: I18n.t('Yes'),
          onPress: () => {
            // Go back to the beginning of the stack
            navigation.popToTop();
            // Go back to main tabs navigation
            navigation.goBack(null);
          },
        },
      ],
    );

    // Need this for android back handler btn to work
    return true;
  }

  get gameUUID() {
    const { navigation } = this.props;
    return navigation.state.params.uuid;
  }

  handleChange = ({ fieldName, value }) => {
    if (!fieldName) {
      return;
    }

    this.setState(
      { [fieldName]: value },
      () => { console.log(this.state); },
    );
  }

  handleNext = async () => {
    Keyboard.dismiss();
    const { navigation } = this.props;
    const { isPublic } = this.state;

    // Set game invite mode
    try {
      await api.setGameInviteMode({
        gameUUID: this.gameUUID,
        inviteMode: isPublic ? 'OPEN' : 'INVITE_ONLY',
      });
    } catch (exc) {
      console.log(exc);
    }

    // Go back to the beginning of the stack
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
    navigation.navigate('GameDetailsScreen', { uuid: this.gameUUID });
  }

  render() {
    const { isPublic } = this.state;

    return (
      <FullHeight>
        <FormLayout
          theme="white"
          title={`${I18n.t('Activity created')}!`}
          closable={false}
        >
          <ShareForm
            gameUUID={this.gameUUID}
            isPublic={isPublic}
            onChange={this.handleChange}
          />
        </FormLayout>
        <Footer
          numPages={4}
          currentPage={3}
          onNext={this.handleNext}
          showBack={false}
          buttonNextText={I18n.t('Close')}
        />
      </FullHeight>
    );
  }
}

ShareGameScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ShareGameScreen;
