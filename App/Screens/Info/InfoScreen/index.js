import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import LogoHeaderBackground from '../../../Backgrounds/LogoHeaderBackground';
import Block from '../../../Components/Common/Block';
import Spacer from '../../../Components/Common/Spacer';
import Divider from '../../../Components/Common/Divider';
import Text from '../../../Components/Common/Text';
import LinkOpenURL from '../../../Components/Common/LinkOpenURL';
import { version as packageJSONVersion } from '../../../../package.json';
import { codePushPropTypes, UPDATE_STATUS, withCodePush } from '../../../Context/CodePush';
import codePush from 'react-native-code-push';
import RaisedButton from '../../../Components/Common/RaisedButton';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
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
    const codePushMetaData = this.props.current;
    const { updateStatus } = this.state;

    return (
      <LogoHeaderBackground>
        <TouchableWithoutFeedback onPress={() => { this.versionPress(); }}>
          <Text size="M" center>
            {`${I18n.t('infoScreen.appVersion')} ${packageJSONVersion} ${codePushMetaData ? codePushMetaData.label : ''}`}
          </Text>
        </TouchableWithoutFeedback>
        <Spacer size="XXL" />
        { (true || updateStatus === UPDATE_STATUS.RESTART_REQUIRED ) && (
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
  ...codePushPropTypes,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withCodePush(InfoScreen);
