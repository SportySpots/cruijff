import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import Colors from '../../Themes/Colors';
import Spacer from '../../Components/Common/Spacer';
import Logo from '../../Components/Common/Logo';
import Text from '../../Components/Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  background-color: ${({ bgColor }) => (bgColor)}
`;
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
    <Container
      bgColor={isWhiteTheme ? Colors.white : Colors.secondaryGreen}
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

/*
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import Logo from '../Components/Common/Logo';
import Text from '../Components/Common/Text';
import Colors from '../Themes/Colors';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: ${windowHeight - 80}; /* windowHeight - headerHeight /
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
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
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
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

LogoHeaderBackground.defaultProps = {
  hideLogo: false,
};

export default LogoHeaderBackground;
*/

/*
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions } from 'react-native';
import styled from 'styled-components';
import Logo from '../Components/Logo';
import Text from '../Components/Text';
import Colors from '../Themes/Colors';
const { height: windowHeight } = Dimensions.get('window');
const AbsoluteFull = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skew: {
    position: 'absolute',
    height: 100,
    width: 1000,
    left: -500,
    top: 0,
    backgroundColor: Colors.secondaryDarkBlueGreen,
    transform: [{ rotate: '-10deg' }],
  },
  logoContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    marginTop: 8,
    color: Colors.black,
  },
});
const LogoHeaderBackground = ({ children }) => (
  <View style={{ height: windowHeight, backgroundColor: Colors.white }}>
    <AbsoluteFull>
      {/* <View style={style.skew} /> //}
      <View style={style.logoContainer}>
        <Logo scale={1} />
        <Text.L bold style={style.logoText}>
          SPORTYSPOTS
        </Text.L>
      </View>
    </AbsoluteFull>
    <View style={{ flex: 1, marginTop: 160 }}>{children}</View>
  </View>
);
LogoHeaderBackground.propTypes = {
  children: PropTypes.any.isRequired,
};
export default LogoHeaderBackground;
*/
