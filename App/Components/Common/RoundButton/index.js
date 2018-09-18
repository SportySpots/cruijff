import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import { getPalette, getPixelsFromSize } from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled, bgColor }) => (disabled ? Colors.lightGray : bgColor)};
  height: ${({ size }) => (getPixelsFromSize(size))};
  width: ${({ size }) => (getPixelsFromSize(size))};
  border-radius: ${({ size }) => (getPixelsFromSize(size))};
  border: 1px solid ${({ disabled, borderColor }) => (disabled ? Colors.lightGray : borderColor)};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const RoundButton = ({
  iconName,
  status,
  size,
  disabled,
  reverse,
  onPress,
  ...rest
}) => {
  const palette = getPalette(status, reverse);
  const { fontColor, bgColor, borderColor } = palette;

  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Container
        size={size}
        bgColor={bgColor}
        borderColor={borderColor}
        disabled={disabled}
      >
        <Icon
          name={iconName}
          size={24}
          color={disabled ? Colors.white : fontColor}
        />
      </Container>
    </TouchableOpacity>
  );
};

RoundButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'warning',
    'ghost',
    'dark',
  ]),
  size: PropTypes.string,
  disabled: PropTypes.bool,
  reverse: PropTypes.bool,
  onPress: PropTypes.func,
  // Plus all props from native TouchableOpacity
};

RoundButton.defaultProps = {
  status: 'default',
  size: 'M',
  disabled: false,
  reverse: false,
  onPress: () => {},
};

export default RoundButton;


/*
import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50;
  border-width: 1;
  border-color: #ddd;
  shadow-color: #000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.4;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const RoundButton = ({
  children,
  size,
  bgColor,
  onPress,
  ...rest
}) => (
  <TouchableOpacity onPress={onPress} {...rest}>
    <Container
      style={{
        height: size,
        width: size,
        backgroundColor: bgColor,
      }}
    >
      {children}
    </Container>
  </TouchableOpacity>
);

RoundButton.propTypes = {
  children: PropTypes.any.isRequired,
  size: PropTypes.number,
  bgColor: PropTypes.string,
  onPress: PropTypes.func,
};

RoundButton.defaultProps = {
  size: 50,
  bgColor: Colors.white,
  onPress: () => {},
};

export default RoundButton;

*/