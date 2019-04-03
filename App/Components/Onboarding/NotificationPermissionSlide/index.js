import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import styled from 'styled-components';

import I18n from '../../../I18n';
import Images from '../../../Themes/Images';
import ImageBackground from '../../../Backgrounds/ImageBackground';
import Text from '../../Common/Text';
import Block from '../../Common/Block';
import Spacer from '../../Common/Spacer';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const NOTIFICATION_PERMISSION = {
  UNDEFINED: null,
  YES: 'yes',
  NO: 'no',
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const ButtonContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class NotificationPermissionSlide extends React.PureComponent {
  onYes = async () => {
    const { onChange } = this.props;
    const hasPermission = await firebase.messaging().requestPermission();
    onChange({ fieldName: 'notificationPermission', value: hasPermission ? NOTIFICATION_PERMISSION.YES : NOTIFICATION_PERMISSION.NO });
  }

  onNo = () => {
    const { onChange } = this.props;
    onChange({ fieldName: 'notificationPermission', value: NOTIFICATION_PERMISSION.NO });
  }

  render() {
    const { notificationPermission } = this.props;

    return (
      <ImageBackground image={Images.locationOnboarding}>
        <View>
          <Text size="M" color="white" center>
            {I18n.t('notificationPermissionSlide.title')}
          </Text>
        </View>
        <Spacer size="L" />
        <ScrollView>
          <Block>
            <Text color="white">{ I18n.t('notificationPermissionSlide.text') }</Text>
            <ButtonContainer>
              <RaisedButton
                onPress={this.onYes}
                variant={notificationPermission === NOTIFICATION_PERMISSION.YES ? 'default' : 'transparent'}
                label={I18n.t('notificationPermissionSlide.buttonYes')}
              />
              <RaisedButton
                onPress={this.onNo}
                variant={notificationPermission === NOTIFICATION_PERMISSION.NO ? 'default' : 'transparent'}
                label={I18n.t('notificationPermissionSlide.buttonNo')}
              />
            </ButtonContainer>
          </Block>
        </ScrollView>
      </ImageBackground>
    );
  }
}

NotificationPermissionSlide.requiredFields = ['notificationPermission'];

NotificationPermissionSlide.propTypes = {
  notificationPermission: PropTypes.string,
  onChange: PropTypes.func,
};

NotificationPermissionSlide.defaultProps = {
  notificationPermission: null,
  onChange: () => {},
};

export default NotificationPermissionSlide;
