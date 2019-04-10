import React from 'react';
import { View } from 'react-native';
import I18n from '../../../I18n';
import Block from '../../../Components/Common/Block';
import Divider from '../../../Components/Common/Divider';
import SwitchWithText from '../../../Components/Common/SwitchWithText';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SettingsScreen extends React.PureComponent {
  handleSwicth = () => {

  }

  render() {
    return (
      <View>
        <Divider />
        <Block>
          <SwitchWithText
            label={I18n.t('settingsScreen.switch.pushNotifications.label')}
            description=""
            // value={allSports}
            onChange={this.handleSwitch}
          />
        </Block>
        <Divider />
      </View>
    );
  }
}

export default SettingsScreen;
