import React from 'react';
import firebase from 'react-native-firebase';
import styled from 'styled-components';
import I18n from '../../../I18n';
import SeedorfAPI from '../../../Services/SeedorfApi';
import { withUser, userPropTypes } from '../../../Context/User';
import Block from '../../../Components/Common/Block';
import Divider from '../../../Components/Common/Divider';
import SwitchWithText from '../../../Components/Common/SwitchWithText';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SettingsScreen extends React.PureComponent {
  handleSwitch = async () => {
    const { user, refetchUser } = this.props;
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      SeedorfAPI.saveFCMToken({
        userUUID: user.uuid,
        fcmToken: await firebase.messaging().getToken(),
      });
    } catch (exc) {
      // User has rejected permissions
    }
    refetchUser();
  }

  render() {
    const { notificationsEnabled } = this.props;
    console.log('SETTINGS SCREEN PROPS', this.props);

    return (
      <Container>
        <Block>
          <SwitchWithText
            label={I18n.t('settingsScreen.switch.pushNotifications.label')}
            description=""
            value={notificationsEnabled}
            onChange={this.handleSwitch}
          />
        </Block>
        <Divider />
      </Container>
    );
  }
}

SettingsScreen.propTypes = {
  user: userPropTypes.user,
  notificationsEnabled: userPropTypes.notificationsEnabled.isRequired,
  refetchUser: userPropTypes.refetchUser.isRequired,
};

SettingsScreen.defaultProps = {
  user: null,
};

export default withUser(SettingsScreen);
