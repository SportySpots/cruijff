import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';
import Icon from '../Icon';
import { getPalette, getPixelsFromSize } from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledRow = styled(Row)`
  background-color: ${({ theme, disabled, bgColor }) => (
    disabled ? theme.colors.silver : theme.colors[bgColor]
  )};
  height: ${({ size }) => (getPixelsFromSize(size).height)};
  width: ${({ width }) => (width || '100%')};
  min-width: 80px;
  border-radius: ${({ size }) => (getPixelsFromSize(size).borderRadius)};
  border: 1px solid ${({ theme, disabled, borderColor }) => (
    disabled ? theme.colors.silver : theme.colors[borderColor]
  )};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const RaisedButton = ({
  label,
  iconSet,
  iconName,
  iconSize,
  variant,
  size,
  disabled,
  width,
  ...rest
}) => {
  const palette = getPalette(variant);
  const { fontColor, bgColor, borderColor, withShadow } = palette; // string to be used with Colors[string]

  const Root = disabled ? View : TouchableOpacity;

  const style = !withShadow ? {} : {
    elevation: 1.5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: Colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 5,
  };

  return (
    <Root {...rest}>
      <StyledRow
        justifyContent="center"
        alignItems="center"
        size={size}
        bgColor={bgColor}
        borderColor={borderColor}
        width={width}
        disabled={disabled}
        style={style}
      >
        {!!iconName && [
          <Icon
            key="icon"
            iconSet={iconSet}
            iconName={iconName}
            size={iconSize}
            color={fontColor}
          />,
          <Spacer key="spacer" row size="L" />,
        ]}
        <Text
          size="M"
          color={disabled ? 'white' : fontColor}
        >
          {label}
        </Text>
      </StyledRow>
    </Root>
  );
};

RaisedButton.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  iconSet: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  variant: PropTypes.oneOf([
    'default', 'primary', 'secondary', 'info', 'warning', 'ghost', 'facebook', 'google', 'transparent',
  ]),
  size: PropTypes.oneOf(['M', 'S']),
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // Plus all props from native Button
};

RaisedButton.defaultProps = {
  iconSet: '',
  iconName: '',
  iconSize: 24,
  variant: 'default',
  size: 'M',
  disabled: false,
  width: '100%',
};

export default RaisedButton;
