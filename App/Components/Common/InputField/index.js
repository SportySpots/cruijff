import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import getInputPalette from '../../../Themes/Palettes';
import Row from '../Row';
import Spacer from '../Spacer';
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
  theme,
  disabled,
  error,
  onPress,
  boxed,
  minWidth,
  testID,
  ...rest
}) => {
  const isTextField = comp === 'TextField';
  const Root = disabled ? View : TouchableOpacity;
  const Comp = isTextField ? TextField : Dropdown;
  const pointerEvents = isTextField ? 'none' : 'auto';
  const { iconColor, disabledColor, errorColor } = getInputPalette(theme);

  let iColor = iconColor;
  if (disabled) { iColor = disabledColor; }
  if (error) { iColor = errorColor; }

  if (boxed) {
    return (
      <Root onPress={onPress} testID={testID}>
        <Row>
          <FlexGrow pointerEvents={pointerEvents}>
            <Comp
              containerStyle={{ width: '100%' }}
              value={value}
              disabled={disabled}
              theme={theme}
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

  return (
    <Root onPress={onPress} testID={testID}>
      <Row>
        <Spacer row size="M" />
        <FlexGrow pointerEvents={pointerEvents}>
          <Comp
            value={value}
            disabled={disabled}
            style={{
              paddingHorizontal: 8,
              textAlign: 'center',
            }}
            containerStyle={{ width }}
            theme={theme}
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
        <Spacer row size="M" />
      </Row>
    </Root>
  );
};

InputField.propTypes = {
  comp: PropTypes.oneOf(['TextField', 'Dropdown']).isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  theme: PropTypes.oneOf(['white', 'black', 'transparent', 'mix']),
  error: PropTypes.string,
  onPress: PropTypes.func,
  boxed: PropTypes.bool,
  minWidth: PropTypes.number,
  testID: PropTypes.string,
  // Plus all props from TextField and Dropdown comps
};

InputField.defaultProps = {
  value: '',
  disabled: false,
  theme: 'black',
  error: '',
  onPress: () => {},
  boxed: false,
  minWidth: null,
  testID: '',
};

export default InputField;
