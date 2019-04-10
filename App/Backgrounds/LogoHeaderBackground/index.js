import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Spacer from '../../Components/Common/Spacer';
import Logo from '../../Components/Common/Logo';
import Text from '../../Components/Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme, isWhiteTheme }) => (
    isWhiteTheme ? theme.colors.white : theme.colors.secondaryGreen
  )};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LogoHeaderBackground = ({
  theme,
  hideLogo,
  children,
}) => {
  const isWhiteTheme = theme === 'white';

  return (
    <Container isWhiteTheme={isWhiteTheme}>
      <ScrollView>
        <Spacer size="XL" />
        {!hideLogo && [
          <View
            key="logo"
            alignItems="center"
          >
            <Logo scale={1} />
            <Spacer size="L" />
            <Text
              size="L"
              color={isWhiteTheme ? 'black' : 'white'}
              bold
            >
              SPORTYSPOTS
            </Text>
          </View>,
          <Spacer key="spacer" size="XL" />,
        ]}
        {children}
      </ScrollView>
    </Container>
  );
};

LogoHeaderBackground.propTypes = {
  theme: PropTypes.oneOf(['green', 'white']),
  hideLogo: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

LogoHeaderBackground.defaultProps = {
  theme: 'white',
  hideLogo: false,
};

export default LogoHeaderBackground;
