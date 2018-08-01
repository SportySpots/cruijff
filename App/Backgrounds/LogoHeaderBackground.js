import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import Logo from '../Components/Common/Logo';
import Text from '../Components/Common/Text';
import Colors from '../Themes/Colors';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: ${windowHeight - 80}; /* windowHeight - headerHeight */
  padding-top: 10;
  background-color: ${Colors.white};
`;

const LogoContainer = styled.View`
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled(Text.L)`
  margin-top: 16px;
  color: ${Colors.black};
`;

const ChildrenContainer = styled.View`
  flex: 1;
  width: ${windowWidth};
`;

const LogoHeaderBackground = ({ hideLogo, children }) => (
  <Container>
    {!hideLogo && (
      <LogoContainer>
        <Logo scale={1} />
        <LogoText bold>
          SPORTYSPOTS
        </LogoText>
      </LogoContainer>
    )}
    <ChildrenContainer>
      {children}
    </ChildrenContainer>
  </Container>
);

LogoHeaderBackground.propTypes = {
  hideLogo: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

LogoHeaderBackground.defaultProps = {
  hideLogo: false,
};

export default LogoHeaderBackground;
