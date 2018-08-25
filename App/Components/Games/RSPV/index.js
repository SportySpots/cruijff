import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Alert } from 'react-native';
import I18n from '../../../I18n/index';
import API from '../../../Services/SeedorfApi';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import AttendingBtn from './AttendingBtn';
import DeclinedBtn from './DeclinedBtn';
import AttendingDeclinedBtn from './AttendingDeclinedBtn';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const RSVP_STATUSES = {
  ATTENDING: 'ATTENDING',
  DECLINED: 'DECLINED',
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class RSPV extends React.PureComponent {
  /**
    * @summary Check whether or not user is attending
    */
  get userRSVP() {
    const { game, user } = this.props;

    for (const attendee of game.attendees) {
      if (user && attendee.user.uuid === user.uuid) {
        return attendee;
      }
    }
    return null;
  }

  get userStatus() {
    const attendee = this.userRSVP;
    return attendee ? attendee.status : null;
  }

  setRSVPStatus = async (status) => {
    const { game, onBeforeHook, onSuccessHook } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Update/set status
    const gameUUID = game.uuid;
    const attendee = this.userRSVP;

    if (attendee) {
      await API.updateRSVPStatus({ gameUUID, rsvpUUID: attendee.uuid, status });
    } else {
      await API.setRSVPStatus({ gameUUID, status });
    }

    // Pass event up to parent component
    onSuccessHook();
  }

  openAlert = () => {
    Alert.alert(
      I18n.t('Confirm'),
      I18n.t('Are you sure you want to stop attending?'),
      [
        { text: I18n.t('No'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: I18n.t('Yes'), onPress: () => this.setRSVPStatus(RSVP_STATUSES.DECLINED) },
      ],
    );
  }

  render() {
    const status = this.userStatus;

    if (!status) {
      return [
        <AttendingBtn
          key="attending-btn"
          onPress={() => {
            this.setRSVPStatus(RSVP_STATUSES.ATTENDING);
          }}
        />,
        <DeclinedBtn
          key="declined-btn"
          onPress={() => {
            this.setRSVPStatus(RSVP_STATUSES.DECLINED);
          }}
        />,
      ];
    }

    return (
      <AttendingDeclinedBtn
        isAttending={status === RSVP_STATUSES.ATTENDING}
        onAttending={() => {
          this.setRSVPStatus(RSVP_STATUSES.ATTENDING);
        }}
        onDeclined={this.openAlert}
      />
    );
  }
}

RSPV.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  game: propType(gameDetailsFragment).isRequired,
  onBeforeHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

RSPV.defaultProps = {
  onBeforeHook: () => {},
  onSuccessHook: () => {},
};

export default RSPV;
