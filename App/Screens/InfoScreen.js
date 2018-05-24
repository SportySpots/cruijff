import React, { Component } from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import LogoHeaderBackground from '../Backgrounds/LogoHeaderBackground';
import I18n from '../I18n';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Themes/Colors';
import PropTypes from 'prop-types';
import Text from '../Components/Text';

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

const InfoScreen = () => (
  <LogoHeaderBackground>
    <Container>
      <Link text={I18n.t('Privacy info')} href="https://www.sportyspots.com/privacy" icon="perm-identity" />
      <Link text={I18n.t('Terms and conditions')} href="https://www.sportyspots.com/terms" icon="info" />
    </Container>
  </LogoHeaderBackground>
);

InfoScreen.navigationOptions = {
  title: I18n.t('Profile Edit'),
  header: () => null,
};

export default InfoScreen;
