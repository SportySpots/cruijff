import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components';
import Colors from '../../Themes/Colors';
import Spacer from '../../Components/Common/Spacer';
import Logo from '../../Components/Common/Logo';
import Text from '../../Components/Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Brand = styled(Text.L)`
  color: ${({ color }) => (color)};
`;
//------------------------------------------------------------------------------
const FlexGrow = styled.View`
  flex-grow: 1;
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
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: isWhiteTheme ? Colors.white : Colors.secondaryGreen,
      }}
    >
      <Spacer size="XL" />
      {!hideLogo && [
        <View
          key="logo"
          alignItems="center"
        >
          <Logo scale={1} />
          <Spacer size="L" />
          <Brand
            color={isWhiteTheme ? Colors.black : Colors.white}
            bold
          >
            SPORTYSPOTS
          </Brand>
        </View>,
        <Spacer key="spacer" size="XL" />,
      ]}
      <FlexGrow>
        {children}
      </FlexGrow>
    </ScrollView>
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
