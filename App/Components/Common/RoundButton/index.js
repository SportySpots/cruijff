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
  border: 0.3px solid ${({ disabled, borderColor }) => (disabled ? Colors.lightGray : borderColor)};
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
    'translucid',
  ]),
  size: PropTypes.oneOf(['S', 'M', 'L', 'XL']),
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
