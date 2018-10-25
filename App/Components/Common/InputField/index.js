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
  onPress,
  boxed,
  minWidth,
  testID,
  ...rest
}) => {
  const isTextField = comp === 'TextField';
  const Comp = isTextField ? TextField : Dropdown;
  const pointerEvents = isTextField ? 'none' : 'auto';
  const { iconColor } = getInputPalette(theme);

  if (boxed) {
    return (
      <TouchableOpacity onPress={onPress} testID={testID}>
        <Row>
          <FlexGrow pointerEvents={pointerEvents}>
            <Comp
              containerStyle={{ width: '100%' }}
              value={value}
              theme={theme}
              {...rest}
            />
          </FlexGrow>
          {/* Add custom carret */}
          <View>
            <Spacer size="XXL" />
            <Icon
              size={24}
              name="keyboard-arrow-down"
              color={iconColor}
            />
          </View>
        </Row>
      </TouchableOpacity>
    );
  }

  // Dynamic width based on content
  const width = value
    ? 12 * value.replace(' ', '').length + 32
    : minWidth || 80;

  return (
    <TouchableOpacity onPress={onPress} testID={testID}>
      <Row>
        <Spacer row size="M" />
        <FlexGrow pointerEvents={pointerEvents}>
          <Comp
            value={value}
            style={{
              paddingHorizontal: 8,
              textAlign: 'center',
            }}
            containerStyle={{ width }}
            theme={theme}
            {...rest}
          />
        </FlexGrow>
        {/* Add custom carret */}
        <View>
          <Spacer size="XXL" />
          <Icon
            size={24}
            name="keyboard-arrow-down"
            color={iconColor}
          />
        </View>
        <Spacer row size="M" />
      </Row>
    </TouchableOpacity>
  );
};

InputField.propTypes = {
  comp: PropTypes.oneOf(['TextField', 'Dropdown']).isRequired,
  value: PropTypes.string,
  theme: PropTypes.oneOf(['white', 'black', 'transparent', 'mix']),
  onPress: PropTypes.func,
  boxed: PropTypes.bool,
  minWidth: PropTypes.number,
  testID: PropTypes.string,
};

InputField.defaultProps = {
  value: '',
  theme: 'black',
  onPress: () => {},
  boxed: false,
  minWidth: null,
  testID: '',
};

export default InputField;
