import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';
import Icon from '../Icon';
import { getPalette, getPixelsFromSize } from './utils';
// import Fonts from "App/Themes/Fonts";

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
const defaultProps = {
  iconSet: '',
  iconName: '',
  iconSize: 24,
  variant: 'default',
  size: 'M',
  disabled: false,
  width: '100%',
}

interface IRequiredProps {
  label: string;
}

type IMergedProps = IRequiredProps & {
  iconSet: string;
  iconName: string;
  iconSize: number;
  variant: 'default'| 'primary'| 'secondary'| 'info'| 'warning'| 'ghost'| 'facebook'| 'google'| 'transparent';
  size: string;
  disabled: boolean;
  width: string;
}

type IProps = IRequiredProps & Partial<IMergedProps> & TouchableOpacityProps

const RaisedButton = (props: IProps) => {
  const mergedProps = {...defaultProps, ...props};

  const {
    label,
    iconSet,
    iconName,
    iconSize,
    variant,
    size,
    disabled,
    width,
    ...rest
  } = mergedProps;

  const palette = getPalette(variant);
  const { fontColor, bgColor, borderColor, withShadow } = palette; // string to be used with Colors[string]

  const Root: React.ElementType = disabled ? View : TouchableOpacity;

  const style = !withShadow ? {} : {
    elevation: 1.5,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 2.25,
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
          color={disabled ? 'white' : fontColor as any}
        >
          {label}
        </Text>
      </StyledRow>
    </Root>
  );
};

export default RaisedButton;
