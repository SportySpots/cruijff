import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import Spacer from '../Spacer';
import { getPalette, getPixelsFromSize } from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  flex-direction: row;
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
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const RaisedButton = ({
  label,
  iconSet,
  iconName,
  variant,
  size,
  disabled,
  width,
  ...rest
}) => {
  const palette = getPalette(variant);
  const { fontColor, bgColor, borderColor } = palette;

  const Root = disabled ? View : TouchableOpacity;
  const Icon = iconSet === 'MaterialIcon' ? MaterialIcon : MaterialCommunityIcon;

  return (
    <Root {...rest}>
      <Container
        size={size}
        bgColor={bgColor}
        borderColor={borderColor}
        width={width}
        disabled={disabled}
      >
        {!!iconName && [
          <Icon
            key="icon"
            name={iconName}
            size={24}
            color={fontColor}
          />,
          <Spacer key="spacer" row size="L" />,
        ]}
        <Label fontColor={fontColor} disabled={disabled}>
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
  iconSet: PropTypes.oneOf(['MaterialIcon', 'MaterialCommunityIcon']),
  iconName: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'warning', 'ghost']),
  size: PropTypes.oneOf(['M', 'S']),
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // Plus all props from native Button
};

RaisedButton.defaultProps = {
  iconSet: 'MaterialIcon',
  iconName: '',
  variant: 'default',
  size: 'M',
  disabled: false,
  width: '100%',
};

export default RaisedButton;
