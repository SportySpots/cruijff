import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import I18n from '../../../I18n/index';
import API from '../../../Services/SeedorfApi';
import Row from '../../Common/Row';
import RaisedButton from '../../Common/RaisedButton';
import Spacer from '../../Common/Spacer';

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
  setRSVPStatus = async (status) => {
    const {
      gameUUID,
      userRSVP,
      onBeforeHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Update/set status
    const attendee = userRSVP;

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
        { text: I18n.t('No'), onPress: () => { console.log('Cancel Pressed'); }, style: 'cancel' },
        { text: I18n.t('Yes'), onPress: () => { this.setRSVPStatus(RSVP_STATUSES.DECLINED); } },
      ],
    );
  }

  render() {
    const { userStatus } = this.props;

    // Attending and declined button
    if (!userStatus) {
      return (
        <Row>
          <RaisedButton
            style={{ flex: 1 }}
            status="primary"
            label={I18n.t("I'm attending")}
            onPress={() => {
              this.setRSVPStatus(RSVP_STATUSES.ATTENDING);
            }}
          />
          <Spacer orientation="row" size="L" />
          <RaisedButton
            style={{ flex: 1 }}
            status="warning"
            label={I18n.t("I'm not attending")}
            onPress={() => {
              this.setRSVPStatus(RSVP_STATUSES.DECLINED);
            }}
          />
        </Row>
      );
    }

    const isAttending = userStatus === RSVP_STATUSES.ATTENDING;

    // When user status is 'attending', display the leave button
    if (isAttending) {
      return (
        <RaisedButton
          style={{ flex: 1 }}
          status="ghost"
          label={I18n.t("I'm not attending")}
          onPress={this.openAlert}
        />
      );
    }

    // When user status is NOT 'attending', display the join button
    return (
      <RaisedButton
        style={{ flex: 1 }}
        status="primary"
        label={I18n.t("I'm attending")}
        onPress={() => {
          this.setRSVPStatus(RSVP_STATUSES.ATTENDING);
        }}
      />
    );
  }
}

RSPV.propTypes = {
  gameUUID: PropTypes.string.isRequired,
  // TODO: use userFragment
  userRSVP: PropTypes.object, // eslint-disable-line
  userStatus: PropTypes.oneOf([
    'UNKNOWN',
    'ACCEPTED',
    'ATTENDING',
    'CHECKED_IN',
    'DECLINED',
    'INTERESTED',
    'INVITED',
  ]).isRequired,
  onBeforeHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

RSPV.defaultProps = {
  userRSVP: null,
  onBeforeHook: () => {},
  onSuccessHook: () => {},
};

export default RSPV;
