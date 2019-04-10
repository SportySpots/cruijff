import React from 'react';
import { View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

import I18n from '../../../I18n';
import { withUser, userPropTypes } from '../../../Context/User';
import Images from '../../../Themes/Images';
import ImageBackground from '../../../Backgrounds/ImageBackground';
import Text from '../../Common/Text';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class NotificationPermissionSlide extends React.PureComponent {
  handleEnable = async () => {
    const { refetchUser } = this.props;
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      refetchUser();
    } catch (exc) {
      // User has rejected permissions
    }
  }

  render() {
    return (
      <ImageBackground image={Images.illustrationNotifications}>
        <View>
          <Text size="L" color="white" center>
            {I18n.t('notificationPermissionSlide.title')}
          </Text>
        </View>
        <Spacer size="L" />
        <ScrollView>
          <Block style={{ flex: 1 }}>
            <Text color="white" semibold center>
              {I18n.t('notificationPermissionSlide.text')}
            </Text>
            <Spacer size="XXL" />
            <Spacer size="M" />
            <Row justifyContent="center">
              <RaisedButton
                onPress={this.handleEnable}
                variant="default"
                label={I18n.t('notificationPermissionSlide.btnLabel')}
                style={{ flex: 1 }}
              />
            </Row>
          </Block>
        </ScrollView>
      </ImageBackground>
    );
  }
}

NotificationPermissionSlide.requiredFields = [];

NotificationPermissionSlide.propTypes = {
  refetchUser: userPropTypes.refetchUser.isRequired,
};

export default withUser(NotificationPermissionSlide);
