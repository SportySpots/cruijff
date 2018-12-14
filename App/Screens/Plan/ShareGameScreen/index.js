import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import I18n from '../../../I18n';
import FormProps from '../../../RenderProps/form-props';
import ShareGameApiCall from '../../../Components/PlanGame/ShareGameApiCall';
import ShareGameForm from '../../../Components/PlanGame/ShareGameForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ShareGameScreen extends React.Component {
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
      I18n.t('shareGameScreen.leaveAlert.header'),
      I18n.t('shareGameScreen.leaveAlert.body'),
      [
        {
          text: I18n.t('shareGameScreen.leaveAlert.footer.cancelBtnLabel'),
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: I18n.t('shareGameScreen.leaveAlert.footer.okBtnLabel'),
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

  render() {
    const { navigation } = this.props;
    const gameUUID = navigation.state.params.uuid;

    return (
      <FormProps>
        {({
          disabled,
          handleBefore,
          handleClientCancel,
          handleClientError,
          handleServerError,
          handleSuccess,
        }) => (
          <ShareGameApiCall
            onShareError={handleServerError}
            onShareSuccess={() => {
              // Extend formProps.handleSuccess' default functionality
              handleSuccess(() => {
                // Go back to the beginning of the stack
                navigation.popToTop();
                // Go back to main tabs navigation
                navigation.goBack(null);
                // Go to games list screen
                navigation.navigate('GamesListScreen');
                // Reset stack (otherwise we'll get a back arrow for some wired reason :S)
                navigation.dispatch(StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: 'GamesListScreen' }),
                  ],
                }));
                // Finally go to recently created game
                navigation.navigate('GameDetailsScreen', { uuid: gameUUID });
              });
            }}
          >
            {({ shareGame }) => (
              <ShareGameForm
                gameUUID={gameUUID}
                disabled={disabled}
                onBeforeHook={handleBefore}
                onClientCancelHook={handleClientCancel}
                onClientErrorHook={handleClientError}
                // Call api to store data into DB
                onSuccessHook={shareGame}
              />
            )}
          </ShareGameApiCall>
        )}
      </FormProps>
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
