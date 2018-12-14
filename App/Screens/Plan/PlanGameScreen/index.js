import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import { withUser, userPropTypes } from '../../../Context/User';
import I18n from '../../../I18n/index';
import FormProps from '../../../RenderProps/form-props';
import RSVPApiCall from '../../../Components/Games/RSVPApiCall';
import PlanGameApiCall from '../../../Components/PlanGame/PlanGameApiCall';
import PlanGameForm from '../../../Components/PlanGame/PlanGameForm';
import { addGlobalRef } from '../../../globalRefs';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
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
    const { navigation, user } = this.props;

    const username = (user && user.first_name) || '';

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
                navigation.navigate('shareGameScreen', { uuid: gameUUID });
              });
            }}
          >
            {({ updateStatus }) => (
              <PlanGameApiCall
                onPlanError={handleServerError}
                onPlanSuccess={({ gameUUID }) => {
                  // Automatically add organizer (current logged in user) to the list of players
                  updateStatus({ gameUUID, userRSVP: null, status: 'ATTENDING' });
                }}
              >
                {({ createGame }) => (
                  <PlanGameForm
                    username={username}
                    disabled={disabled}
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
  user: userPropTypes.user.isRequired,
};

export default withUser(PlanGameScreen);


/*
import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import { withUser, userPropTypes } from '../../../Context/User';
import I18n from '../../../I18n/index';
import FormProps from '../../../RenderProps/form-props';
import PlanGameApiCall from '../../../Components/PlanGame/PlanGameApiCall';
import PlanGameForm from '../../../Components/PlanGame/PlanGameForm';
import { addGlobalRef } from '../../../globalRefs';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
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
      I18n.t('Confirm'),
      I18n.t('Are you sure you want to cancel this game?'),
      [
        { text: I18n.t('No'), onPress: () => null, style: 'cancel' },
        { text: I18n.t('Yes'), onPress: () => { navigation.goBack(null); } },
      ],
    );

    // Need this for android back handler btn to work
    return true;
  }

  render() {
    const { navigation, user } = this.props;

    const username = (user && user.first_name) || '';

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
          <PlanGameApiCall
            onPlanError={handleServerError}
            onPlanSuccess={({ gameUUID }) => {
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
                navigation.navigate('shareGameScreen', { uuid: gameUUID });
              });
            }}
          >
            {({ createGame }) => (
              <PlanGameForm
                username={username}
                disabled={disabled}
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
      </FormProps>
    );
  }
}

PlanGameScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  user: userPropTypes.user.isRequired,
};

export default withUser(PlanGameScreen);

*/
