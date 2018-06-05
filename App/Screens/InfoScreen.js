import React from 'react';
import { TouchableOpacity, Linking, TouchableWithoutFeedback } from 'react-native';
import codePush from 'react-native-code-push';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import I18n from '../I18n';
import LogoHeaderBackground from '../Backgrounds/LogoHeaderBackground';

import Text from '../Components/Text';
import Colors from '../Themes/Colors';

import { navigation as navigationPropType } from '../PropTypesDefinitions/navigation';

const Row = styled.View`
  height: 42px;
  padding-vertical: 8px;

  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray};
  flex-direction: row;
`;

const LeftContainer = styled.View`
  flex: 1;
  margin-horizontal: 8px;
`;

const RightContainer = styled.View`
  width: 32px;
`;

const Container = styled.View`
  flex: 1;
  margin-top: 48px;
`;

const VersionContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Link = ({ text, href, icon }) => (
  <Row>
    <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => Linking.openURL(href)}>
      <LeftContainer>
        <Text.M>{text}</Text.M>
      </LeftContainer>
      <RightContainer>
        <Icon name={icon} size={24} />
      </RightContainer>
    </TouchableOpacity>
  </Row>
);

Link.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.any,
};

class InfoScreen extends React.Component {
  static propTypes = {
    navigation: navigationPropType,
  }
  constructor(props) {
    super(props);
    this.state = {
      label: '?',
      version: '?',
      description: '?',
      versionTaps: 0,
    };
  }

  componentDidMount() {
    codePush.getUpdateMetadata().then((metadata) => {
      this.setState({
        label: metadata.label,
        version: metadata.appVersion,
        description: metadata.description,
      });
    }).catch(() => null);
  }

  componentWillUnmount() {
    clearTimeout(this.versionTapTimer);
  }

  versionPress() {
    /* go to DebugNav after 10 presses */
    this.setState({ versionTaps: this.state.versionTaps + 1 });
    if (!this.versionTapTimer) {
      this.versionTapTimer = setTimeout(() => {
        this.setState({ versionTaps: 0 });
        this.versionTapTimer = null;
      }, 5000);
    }
    if (this.state.versionTaps === 10) {
      this.props.navigation.navigate('DebugNav');
    }
  }

  render() {
    return (
      <LogoHeaderBackground>
        <TouchableWithoutFeedback onPress={() => this.versionPress()}>
          <VersionContainer>
            <Text.S>{this.state.version} {this.state.label} {this.state.description}</Text.S>
          </VersionContainer>
        </TouchableWithoutFeedback>
        <Container>
          <Link text={I18n.t('Privacy info')} href="https://www.sportyspots.com/privacy.html" icon="perm-identity" />
          <Link text={I18n.t('Terms and conditions')} href="https://www.sportyspots.com/terms.html" icon="info" />
        </Container>
      </LogoHeaderBackground>
    );
  }
}

export default InfoScreen;
