import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Alert } from 'react-native';
import I18n from '../../../../I18n/index';
import API from '../../../../Services/SeedorfApi';
import gameDetailsFragment from '../../../../GraphQL/Games/Fragments/gameDetails';
import { Block, HorizontalView } from '../style';
import AttendingBtn from './AttendingBtn';
import DeclinedBtn from './DeclinedBtn';
import AttendingDeclinedBtn from './AttendingDeclinedBtn';

const RSVP_STATUSES = {
  ATTENDING: 'ATTENDING',
  DECLINED: 'DECLINED',
};

class RSPV extends React.PureComponent {
  /**
    * @summary Check whether or not user is attending
    */
  get userRSVP() {
    const { game, user } = this.props;
    for (const attendee of game.attendees) {
      if (attendee.user.uuid === user.uuid) {
        return attendee;
      }
    }
    return null;
  }

  get userStatus() {
    const attendee = this.userRSVP;
    return attendee ? attendee.status : null;
  }

/*
setRSVPStatus = async (status) => {
  const attendee = this.userRSVP;
  if (attendee) {
    await API.updateRSVPStatus({
      gameUUID: this.props.data.game.uuid,
      rsvpUUID: attendee.uuid,
      status,
    });
  } else {
    await API.setRSVPStatus({ gameUUID: this.props.data.game.uuid, status });
  }
  // Pass event up to parent component

  // this.props.refetch();
}
*/

  setRSVPStatus = async (status) => {
    const { game, onRSPVBtnPress } = this.props;
    const gameUUID = game.uuid;

    const attendee = this.userRSVP;
    if (attendee) {
      await API.updateRSVPStatus({ gameUUID, rsvpUUID: attendee.uuid });
    } else {
      await API.setRSVPStatus({ gameUUID, status });
    }
    // Pass event up to parent component
    onRSPVBtnPress();
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
      return (
        <Block>
          <HorizontalView style={{ width: '100%' }}>
            <AttendingBtn
              onPress={() => {
                this.setRSVPStatus(RSVP_STATUSES.ATTENDING);
              }}
            />
            <DeclinedBtn
              onPress={() => {
                this.setRSVPStatus(RSVP_STATUSES.DECLINED);
              }}
            />
            {/* <DefaultButton
              style={{ flex: 1, marginLeft: -10 }}
              bgColor={Colors.primaryGreen}
              textColor={Colors.white}
              text={I18n.t("I'm attending")}
              onPress={() => (!this.props.user.uuid ?
                this.props.navigation.navigate('ProfileTab') : // TODO
                this.setRSVPStatus(RSVP_STATUSES.ATTENDING))
              }
            />
            <DefaultButton
              style={{ flex: 1, marginRight: -10 }}
              bgColor={Colors.red}
              textColor={Colors.white}
              text={I18n.t("I'm not attending")}
              onPress={() => (!this.props.user.uuid ?
                this.props.navigation.navigate('ProfileTab') :
                this.setRSVPStatus(RSVP_STATUSES.DECLINED))}
            /> */}
          </HorizontalView>
        </Block>
      );
    }
    return (
      <Block>
        <HorizontalView style={{ width: '100%' }}>
          <AttendingDeclinedBtn
            isAttending={status === RSVP_STATUSES.ATTENDING}
            onAttending={() => {
              this.setRSVPStatus(RSVP_STATUSES.ATTENDING);
            }}
            onDeclined={this.openAlert}
          />
          {/* <DefaultButton
            style={{ flex: 1, marginLeft: -10 }}
            bgColor={status === RSVP_STATUSES.ATTENDING ? Colors.white : Colors.primaryGreen}
            borderColor={status === RSVP_STATUSES.ATTENDING ? Colors.black : Colors.primaryGreen}
            textColor={status === RSVP_STATUSES.ATTENDING ? Colors.black : Colors.white}
            text={I18n.t(status === RSVP_STATUSES.ATTENDING ? "I'm not attending" : "I'm attending")}
            onPress={() => {
              if (status === RSVP_STATUSES.ATTENDING) {
                Alert.alert(
                  I18n.t('Confirm'),
                  I18n.t('Are you sure you want to stop attending?'),
                  [
                    { text: I18n.t('No'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: I18n.t('Yes'), onPress: () => this.setRSVPStatus(RSVP_STATUSES.DECLINED) },
                  ],
                );
              } else {
                this.setRSVPStatus(RSVP_STATUSES.ATTENDING);
              }
            }}
          /> */}
        </HorizontalView>
      </Block>
    );
  }
}

RSPV.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  game: propType(gameDetailsFragment).isRequired,
  onRSPVBtnPress: PropTypes.func,
};

RSPV.defaultProps = {
  onRSPVBtnPress: () => {},
};

export default RSPV;
