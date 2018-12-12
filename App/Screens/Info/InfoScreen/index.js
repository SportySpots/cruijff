import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import codePush from 'react-native-code-push';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import LogoHeaderBackground from '../../../Backgrounds/LogoHeaderBackground';
import Block from '../../../Components/Common/Block';
import Spacer from '../../../Components/Common/Spacer';
import Divider from '../../../Components/Common/Divider';
import Text from '../../../Components/Common/Text';
import Link from '../../../Components/Common/Link';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Version = styled(Text.M)`
  text-align: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class InfoScreen extends React.Component {
  state = {
    // label: '?',
    version: '?',
    // description: '?',
    versionTaps: 0,
  }

  componentDidMount() {
    if (codePush) {
      codePush.getUpdateMetadata().then((metadata) => {
        this.setState({
          // label: metadata.label,
          version: metadata.appVersion,
          // description: metadata.description,
        });
      }).catch(() => null);
    }
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
    const { version } = this.state;

    return (
      <LogoHeaderBackground>
        <TouchableWithoutFeedback onPress={() => { this.versionPress(); }}>
          <Version>
            {`${I18n.t('infoScreenAppVersion')} ${version}`}
          </Version>
        </TouchableWithoutFeedback>
        <Spacer size="XXXL" />
        <Divider />
        <Block midHeigh>
          <Link
            text={I18n.t('infoScreenFeedback')}
            href="https://goo.gl/forms/3oc4XPVkQtXMSKK33"
            iconName="chat"
          />
        </Block>
        <Divider />
        <Block midHeigh>
          <Link
            text={I18n.t('infoScreenPrivacy')}
            href="https://www.sportyspots.com/privacy.html"
            iconName="account-circle"
          />
        </Block>
        <Divider />
        <Block midHeigh>
          <Link
            text={I18n.t('infoScreenTerms')}
            href="https://www.sportyspots.com/terms.html"
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
