import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from '../Icon';
import { getPalette, getPixelsFromSize } from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, disabled, bgColor }) => (
    disabled ? theme.colors.silver : theme.colors[bgColor]
  )};
  height: ${({ size }) => (getPixelsFromSize(size))};
  width: ${({ size }) => (getPixelsFromSize(size))};
  border-radius: ${({ size }) => (getPixelsFromSize(size))};
  border: 0.3px solid ${({ theme, disabled, borderColor }) => (
    disabled ? theme.colors.silver : theme.colors[borderColor]
  )};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const RoundButton = ({
  iconSet,
  iconName,
  status,
  size,
  disabled,
  reverse,
  onPress,
  bgColor: bgOverride,
  ...rest
}) => {
  const palette = getPalette(status, reverse);
  const { fontColor, bgColor, borderColor } = palette; // string to be used Colors[string]

  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Container
        size={size}
        bgColor={bgOverride || bgColor}
        borderColor={borderColor}
        disabled={disabled}
      >
        <Icon
          iconSet={iconSet}
          iconName={iconName}
          size={24}
          color={disabled ? 'white' : fontColor}
        />
      </Container>
    </TouchableOpacity>
  );
};

RoundButton.propTypes = {
  iconSet: PropTypes.string.isRequired,
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
  bgColor: PropTypes.string,
  // Plus all props from native TouchableOpacity
};

RoundButton.defaultProps = {
  status: 'default',
  size: 'M',
  disabled: false,
  reverse: false,
  onPress: () => {},
  bgColor: undefined,
};

export default RoundButton;
