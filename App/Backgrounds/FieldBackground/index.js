import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';
import Colors from '../../Themes/Colors';
import Logo from '../../Components/Common/Logo';
import Spacer from '../../Components/Common/Spacer';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { width: fullWidth, height: fullHeight } = Dimensions.get('window');
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const BgContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primaryGreen}
  position: absolute;
  left: 0;
  top: 0;
`;
//------------------------------------------------------------------------------
const FlexGrow = styled.View`
  flex-grow: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const FieldBackground = ({ children }) => (
  <ScrollView contentContainerStyle={{ flex: 1 }}>
    <BgContainer>
      <Svg width={fullWidth} height={fullHeight}>
        <Path
          d={`M${0.2 * fullWidth} 0 h ${0.08 * fullWidth} L ${0.16 *
          fullWidth} ${fullHeight} h ${-0.12 * fullWidth} Z`}
          fill="white"
        />
        <Path
          d={`M0 0 h ${fullWidth} v ${0.5 * fullHeight} L 0 ${2 / 3 * fullHeight} Z`}
          fill={Colors.secondaryDarkBlueGreen}
          opacity=".84"
        />
      </Svg>
    </BgContainer>
    <Spacer size="XXXL" />
    <Spacer size="XXXL" />
    <View alignItems="center">
      <Logo scale={1} />
    </View>
    <Spacer size="XXXL" />
    <FlexGrow>
      {children}
    </FlexGrow>
  </ScrollView>
);

FieldBackground.propTypes = {
  children: PropTypes.node,
};

FieldBackground.defaultProps = {
  children: null,
};

export default FieldBackground;
