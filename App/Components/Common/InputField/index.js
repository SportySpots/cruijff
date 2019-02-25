import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import getInputPalette from '../../../Themes/Palettes';
import Fonts from '../../../Themes/Fonts';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';
import TextField from '../TextField';
import Dropdown from '../Dropdown';

//------------------------------------------------------------------------------
// CONST:
//------------------------------------------------------------------------------
const MIN_WIDTH = 80;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexGrow = styled.View`
  flex-grow: 1; /* full width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const InputField = ({
  comp,
  value,
  prefix,
  suffix,
  theme,
  disabled,
  error,
  onPress,
  fullWidth,
  minWidth,
  testID,
  size,
  ...rest
}) => {
  const isTextField = comp === 'TextField';
  const Root = disabled ? View : TouchableOpacity;
  const Comp = isTextField ? TextField : Dropdown;
  const pointerEvents = isTextField ? 'none' : 'auto';
  const { baseColor, iconColor, disabledColor, errorColor } = getInputPalette(theme);

  let iColor = iconColor;
  if (disabled) { iColor = disabledColor; }
  if (error) { iColor = errorColor; }

  if (fullWidth) {
    return (
      <Root onPress={onPress} testID={testID}>
        <Row>
          <FlexGrow pointerEvents={pointerEvents}>
            <Comp
              containerStyle={{ width: '100%' }}
              value={value}
              disabled={disabled}
              theme={theme}
              size={size}
              error={error}
              {...rest}
            />
          </FlexGrow>
          {/* Add custom carret */}
          <View>
            <Spacer size="XXL" />
            <Icon
              size={24}
              name="keyboard-arrow-down"
              color={iColor}
            />
          </View>
        </Row>
      </Root>
    );
  }

  // Dynamic width based on content
  const width = Math.max(
    minWidth || MIN_WIDTH,
    (value && 12 * value.replace(' ', '').length + 32) || MIN_WIDTH,
    (error && 6 * error.replace(' ', '').length) || MIN_WIDTH,
  );

  const TextSize = Text[size];

  return (
    <Root onPress={onPress} testID={testID}>
      <Row>
        <View>
          <Spacer size="XXL" />
          <TextSize style={{ color: baseColor }}>
            {prefix}
          </TextSize>
        </View>
        <Spacer row size="ML" />
        <View pointerEvents={pointerEvents}>
          <Comp
            value={value}
            disabled={disabled}
            style={{
              paddingHorizontal: 8,
              textAlign: 'center',
            }}
            containerStyle={{ width }}
            theme={theme}
            size={size}
            error={error}
            {...rest}
          />
        </View>
        {/* Add custom carret */}
        <View>
          <Spacer size="XXL" />
          <Icon
            size={24}
            name="keyboard-arrow-down"
            color={iColor}
          />
        </View>
        <Spacer row size="ML" />
        <View>
          <Spacer size="XXL" />
          <TextSize style={{ color: baseColor }}>
            {suffix}
          </TextSize>
        </View>
      </Row>
    </Root>
  );
};

InputField.propTypes = {
  comp: PropTypes.oneOf(['TextField', 'Dropdown']).isRequired,
  value: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  disabled: PropTypes.bool,
  theme: PropTypes.oneOf(['white', 'black', 'transparent', 'mix']),
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  error: PropTypes.string,
  onPress: PropTypes.func,
  fullWidth: PropTypes.bool,
  minWidth: PropTypes.number,
  testID: PropTypes.string,
  // Plus all props from TextField and Dropdown comps
};

InputField.defaultProps = {
  value: '',
  prefix: '',
  suffix: '',
  disabled: false,
  theme: 'black',
  size: 'M',
  error: '',
  onPress: () => {},
  fullWidth: false,
  minWidth: null,
  testID: '',
};

export default InputField;
