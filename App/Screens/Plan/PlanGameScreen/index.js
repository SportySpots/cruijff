import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import I18n from '../../../I18n';
import FormProps from '../../../RenderProps/form-props';
import RSVPApiCall from '../../../Components/Games/RSVPApiCall';
import PlanGameApiCall from '../../../Components/PlanGame/PlanGameApiCall';
import PlanGameForm from '../../../Components/PlanGame/PlanGameForm';
import { addGlobalRef } from '../../../globalRefs';
import {GameCreatedEvent} from "App/Services/GameEvents";
import {observer} from "mobx-react";
import userStore from 'App/Stores/User';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
@observer
class PlanGameScreen extends React.Component {
  // Handle android back button press
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleLeave);
    }
    addGlobalRef('PlanGameScreen')(this);
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
      I18n.t('planGameScreen.leaveAlert.header'),
      I18n.t('planGameScreen.leaveAlert.body'),
      [
        {
          text: I18n.t('planGameScreen.leaveAlert.footer.cancelBtnLabel'),
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: I18n.t('planGameScreen.leaveAlert.footer.okBtnLabel'),
          onPress: () => { navigation.goBack(null); },
        },
      ],
    );

    // Need this for android back handler btn to work
    return true;
  }

  render() {
    const { navigation } = this.props;
    const user = userStore.user;
    const username = user && user.name ? user.name.split(' ')[0] : '';

    return (
      <FormProps>
        {({
          disabled,
          errors,
          handleBefore,
          handleClientCancel,
          handleClientError,
          handleServerError,
          handleSuccess,
        }) => (
          <RSVPApiCall
            onRSVPError={handleServerError}
            onRSVPSuccess={({ gameUUID }) => {
              // Extend formProps.handleSuccess' default functionality
              handleSuccess(() => {
                // Remove android back btn listener manually. Stack navigator won't
                // unmount this view until the whole create and share process is completed.
                // We still need the componentWillUnmount life cycle method in case the user
                // decides to leave the create flow.
                if (Platform.OS === 'android') {
                  BackHandler.removeEventListener('hardwareBackPress', this.handleLeave);
                }
                // Lastly, redirect user to share screen
                navigation.navigate('ShareGameScreen', { uuid: gameUUID });
              });
            }}
          >
            {({ updateStatus }) => (
              <PlanGameApiCall
                onPlanError={handleServerError}
                onPlanSuccess={({ gameUUID }) => {
                  // Automatically add organizer (current logged in user) to the list of players
                  updateStatus({ gameUUID, userRSVP: null, status: 'ATTENDING' });
                  GameCreatedEvent.emit({ uuid: gameUUID });
                }}
              >
                {({ createGame }) => (
                  <PlanGameForm
                    username={username}
                    disabled={disabled}
                    errors={errors}
                    onBeforeHook={handleBefore}
                    onClientCancelHook={handleClientCancel}
                    onClientErrorHook={handleClientError}
                    // Call api to store data into DB
                    onSuccessHook={createGame}
                    onLeave={this.handleLeave}
                  />
                )}
              </PlanGameApiCall>
            )}
          </RSVPApiCall>
        )}
      </FormProps>
    );
  }
}

PlanGameScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default PlanGameScreen;
