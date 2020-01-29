import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'App/I18n';
import LogoHeaderBackground from 'App/Backgrounds/LogoHeaderBackground';
import Block from 'App/Components/Common/Block';
import Spacer from 'App/Components/Common/Spacer';
import Divider from 'App/Components/Common/Divider';
import Text from 'App/Components/Common/Text';
import LinkOpenURL from 'App/Components/Common/LinkOpenURL';
import { version as packageJSONVersion } from 'App/../package.json';
import codePush from 'react-native-code-push';
import RaisedButton from 'App/Components/Common/RaisedButton';
import {observer} from "mobx-react";
import codePushStore, { UPDATE_STATUS } from 'App/Stores/CodePush'
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
@observer
class InfoScreen extends React.Component {
  state = {
    versionTaps: 0,
  }

  componentWillUnmount() {
    clearTimeout(this.versionTapTimer);
  }

  versionPress() {
    const { navigation } = this.props;
    const { versionTaps } = this.state;

    // Go to DebugNav after 10 presses
    this.setState({ versionTaps: versionTaps + 1 });

    if (!this.versionTapTimer) {
      this.versionTapTimer = setTimeout(() => {
        this.setState({ versionTaps: 0 });
        this.versionTapTimer = null;
      }, 5000);
    }

    if (versionTaps === 10) {
      navigation.navigate('DebugNav');
    }
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const codePushMetaData = codePushStore.current
    const updateStatus = codePushStore.updateStatus

    return (
      <LogoHeaderBackground>
        <TouchableWithoutFeedback onPress={() => { this.versionPress(); }}>
          <Text size="M" center>
            {`${I18n.t('infoScreen.appVersion')} ${packageJSONVersion} ${codePushMetaData ? codePushMetaData.label : ''}`}
          </Text>
        </TouchableWithoutFeedback>
        <Spacer size="XXL" />
        { updateStatus === UPDATE_STATUS.RESTART_REQUIRED && (
          <RaisedButton
            label={I18n.t('codePush.updateRestart')}
            variant="warning"
            iconSet="MaterialIcons"
            iconName="update"
            onPress={() => codePush.restartApp()}
          />
        )}
        <Divider />
        <Block midHeigh>
          <LinkOpenURL
            text={I18n.t('infoScreen.feedback')}
            href="https://goo.gl/forms/3oc4XPVkQtXMSKK33"
            iconSet="MaterialIcons"
            iconName="chat"
          />
        </Block>
        <Divider />
        <Block midHeigh>
          <LinkOpenURL
            text={I18n.t('infoScreen.privacy')}
            href="https://www.sportyspots.com/privacy.html"
            iconSet="MaterialCommunityIcons"
            iconName="shield-account"
          />
        </Block>
        <Divider />
        <Block midHeigh>
          <LinkOpenURL
            text={I18n.t('infoScreen.terms')}
            href="https://www.sportyspots.com/terms.html"
            iconSet="MaterialIcons"
            iconName="info"
          />
        </Block>
        <Divider />
      </LogoHeaderBackground>
    );
  }
}

InfoScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default InfoScreen;
