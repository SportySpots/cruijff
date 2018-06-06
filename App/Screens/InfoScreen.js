import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import codePush from 'react-native-code-push';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import I18n from '../I18n';
import LogoHeaderBackground from '../Backgrounds/LogoHeaderBackground';

import Text from '../Components/Text';
import Colors from '../Themes/Colors';


const Row = styled.View`
  height: 64px;
  padding-vertical: 16px;
  flex-direction: row;
  border-top-width: ${props => props.first ? '1px' : '0px'};
  border-top-color: ${Colors.shade};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.shade};
  margin-horizontal: 16px;
  
  `;

const LeftContainer = styled.View`
  flex: 1;
  margin-horizontal: 8px;
  justify-content: center;
`;

const RightContainer = styled.View`
  width: 32px;
  margin-horizontal: 8px;
  justify-content: center;
`;

const Container = styled.View`
  flex: 1;
  margin-top: 56px;
`;

const VersionContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Link = ({ text, href, icon, first }) => (
  <Row first={first}>
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
  first: PropTypes.bool,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.any,
};

class InfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '?',
      version: '?',
      description: '?',
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

  render() {
    return (
      <LogoHeaderBackground>
        <VersionContainer>
          <Text.M>{this.state.version} {this.state.label} {this.state.description}</Text.M>
        </VersionContainer>
        <Container>
          <Link first text={I18n.t('Privacy info')} href="https://www.sportyspots.com/privacy.html" icon="perm-identity" />
          <Link text={I18n.t('Terms and conditions')} href="https://www.sportyspots.com/terms.html" icon="info" />
        </Container>
      </LogoHeaderBackground>
    );
  }
}

InfoScreen.navigationOptions = {
  title: I18n.t('Profile Edit'),
  header: () => null,
};

export default InfoScreen;
