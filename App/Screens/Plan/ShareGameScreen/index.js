import React from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import { Query } from 'react-apollo';
import FormProps from '../../../RenderProps/form-props';
import ShareGameApiCall from '../../../Components/PlanGame/ShareGameApiCall';
import ShareGameForm from '../../../Components/PlanGame/ShareGameForm';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';

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

    // Go back to the beginning of the stack
    navigation.popToTop();
    // Go back to main tabs navigation
    navigation.goBack(null);

    // Alert.alert(
    //   I18n.t('shareGameScreen.leaveAlert.header'),
    //   I18n.t('shareGameScreen.leaveAlert.body'),
    //   [
    //     {
    //       text: I18n.t('shareGameScreen.leaveAlert.footer.cancelBtnLabel'),
    //       onPress: () => null,
    //       style: 'cancel',
    //     },
    //     {
    //       text: I18n.t('shareGameScreen.leaveAlert.footer.okBtnLabel'),
    //       onPress: () => {
    //         // Go back to the beginning of the stack
    //         navigation.popToTop();
    //         // Go back to main tabs navigation
    //         navigation.goBack(null);
    //       },
    //     },
    //   ],
    // );

    // Need this for android back handler btn to work
    return true;
  }

  render() {
    const { navigation } = this.props;
    const gameUUID = navigation.state.params.uuid;

    return (
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: gameUUID }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => (
          loading || error ? null : (
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
                      navigation.navigate('GameSearchTab');
                      // Finally go to recently created game
                      navigation.navigate('GameDetailsScreen', { uuid: gameUUID });
                    });
                  }}
                >
                  {({ shareGame }) => (
                    <ShareGameForm
                      game={data.game}
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
          ))
        }
      </Query>
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
