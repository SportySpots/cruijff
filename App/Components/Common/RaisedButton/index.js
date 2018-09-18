import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import { getPalette, getPixelsFromSize } from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled, bgColor }) => (disabled ? Colors.lightGray : bgColor)};
  height: ${({ size }) => (getPixelsFromSize(size).height)};
  width: ${({ width }) => (width || '100%')};
  min-width: 80px;
  border-radius: ${({ size }) => (getPixelsFromSize(size).borderRadius)};
  border: 1px solid ${({ disabled, borderColor }) => (disabled ? Colors.lightGray : borderColor)};
`;
//------------------------------------------------------------------------------
const Label = styled(Text.M)`
  color: ${({ disabled, fontColor }) => (disabled ? Colors.white : fontColor)};
  font-weight: 500;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: use children instead of label
const RaisedButton = ({
  label,
  status,
  size,
  disabled,
  width,
  ...rest
}) => {
  const palette = getPalette(status);
  const { fontColor, bgColor, borderColor } = palette;

  const Root = disabled ? View : TouchableOpacity;

  return (
    <Root {...rest}>
      <Container
        size={size}
        bgColor={bgColor}
        borderColor={borderColor}
        width={width}
        disabled={disabled}
      >
        <Label
          fontColor={fontColor}
          disabled={disabled}
        >
          {label}
        </Label>
      </Container>
    </Root>
  );
};

RaisedButton.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  status: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'warning', 'ghost']),
  size: PropTypes.oneOf(['M', 'S']),
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // Plus all props from native Button
};

RaisedButton.defaultProps = {
  status: 'default',
  size: 'M',
  disabled: false,
  width: '100%',
};

export default RaisedButton;
