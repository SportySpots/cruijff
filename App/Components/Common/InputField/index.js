import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
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
// TODO: add width props?
const InputField = ({
  comp,
  theme,
  onPress,
  boxed,
  ...rest
}) => {
  const isTextField = comp === 'TextField';
  const Comp = isTextField ? TextField : Dropdown;
  const pointerEvents = isTextField ? 'none' : 'auto';
  const isWhiteTheme = theme === 'white';

  if (boxed) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Row>
          <FlexGrow pointerEvents={pointerEvents}>
            <Comp
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
              color={isWhiteTheme ? Colors.white : Colors.black}
            />
          </View>
        </Row>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Row>
        <Spacer orientation="row" size="M" />
        <FlexGrow pointerEvents={pointerEvents}>
          <Comp
            theme={theme}
            style={{
              paddingHorizontal: 8,
              textAlign: 'center',
            }}
            {...rest}
          />
        </FlexGrow>
        {/* Add custom carret */}
        <View>
          <Spacer size="XXL" />
          <Icon
            size={24}
            name="keyboard-arrow-down"
            color={isWhiteTheme ? Colors.white : Colors.black}
          />
        </View>
        <Spacer orientation="row" size="M" />
      </Row>
    </TouchableOpacity>
  );
};

InputField.propTypes = {
  comp: PropTypes.oneOf(['TextField', 'Dropdown']).isRequired,
  theme: PropTypes.oneOf(['white', 'black']),
  onPress: PropTypes.func,
  boxed: PropTypes.bool,
};

InputField.defaultProps = {
  theme: 'black',
  onPress: () => {},
  boxed: false,
};

export default InputField;

/*
import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import Row from '../Row';
import Spacer from '../Spacer';
import TextField from '../TextField';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexGrow = styled.View`
  flex-grow: 1; /* full width /
  `;
  //------------------------------------------------------------------------------
  // COMPONENT:
  //------------------------------------------------------------------------------
  const InputField = ({
    theme,
    size,
    value,
    onPress,
    ...rest
  }) => {
    const isWhiteTheme = theme === 'white';

    return (
      <TouchableOpacity onPress={onPress}>
        <Row>
          <FlexGrow pointerEvents="none">
            <TextField
              theme={theme}
              size={size}
              value={value}
              {...rest}
            />
          </FlexGrow>
          {/* Add custom carret //}
          <View>
            <Spacer size="XXL" />
            <Icon
              size={24}
              name="keyboard-arrow-down"
              color={isWhiteTheme ? Colors.white : Colors.black}
            />
          </View>
        </Row>
      </TouchableOpacity>
    );
  };

  InputField.propTypes = {
    theme: PropTypes.oneOf(['white', 'black']),
    size: PropTypes.oneOf(Object.keys(Fonts.style)),
    value: PropTypes.string,
    onPress: PropTypes.func,
  };

  InputField.defaultProps = {
    theme: 'black',
    size: 'M',
    value: '',
    onPress: () => {},
  };

  export default InputField;
*/

/*
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Input = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ isWhiteTheme }) => (isWhiteTheme ? Colors.white : Colors.black)};
  padding-horizontal: 8px;
  min-width: 40px;
  height: 32px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const InputField = ({
  theme,
  size,
  value,
  onPress,
}) => {
  const TextSize = Text[size.toUpperCase()];
  const isWhiteTheme = theme === 'white';

  return (
    <TouchableOpacity onPress={onPress}>
      <Row>
        <Spacer orientation="row" size="M" />
        <Input isWhiteTheme={isWhiteTheme}>
          <TextSize style={{ textAlign: 'center' }}>
            {value}
          </TextSize>
        </Input>
        <Icon
          size={24}
          name="keyboard-arrow-down"
          color={isWhiteTheme ? Colors.white : Colors.black}
        />
        <Spacer orientation="row" size="M" />
      </Row>
    </TouchableOpacity>
  );
};

InputField.propTypes = {
  theme: PropTypes.oneOf(['white', 'black']),
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  value: PropTypes.string,
  onPress: PropTypes.func,
};

InputField.defaultProps = {
  theme: 'black',
  size: 'M',
  value: '',
  onPress: () => {},
};

export default InputField;
*/
