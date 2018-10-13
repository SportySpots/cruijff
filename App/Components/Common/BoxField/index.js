/* import React from 'react';
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
  flex-grow: 1; /* full width //
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: add width props?
const BoxField = ({
  comp,
  theme,
  onPress,
  ...rest
}) => {
  const isTextField = comp === 'TextField';
  const Comp = isTextField ? TextField : Dropdown;
  const pointerEvents = isTextField ? 'none' : 'auto';
  const isWhiteTheme = theme === 'white';

  return (
    <TouchableOpacity onPress={onPress}>
      <Row>
        <FlexGrow pointerEvents={pointerEvents}>
          <Comp
            theme={theme}
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

BoxField.propTypes = {
  comp: PropTypes.oneOf(['TextField', 'Dropdown']).isRequired,
  theme: PropTypes.oneOf(['white', 'black']),
  onPress: PropTypes.func,
};

BoxField.defaultProps = {
  theme: 'black',
  onPress: () => {},
};

export default BoxField;
*/

/*
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
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
const Container = styled.View`
  /* border-bottom-width: 1px;
  border-bottom-color: ${({ isWhiteTheme }) => (isWhiteTheme ? Colors.white : Colors.black)};
  padding-horizontal: 8px;
  min-width: 40px; //
  height: 34px;
  display: flex;
  justify-content: flex-end;
  /* border: 1px solid red; //
`;
//------------------------------------------------------------------------------
const Label = styled(Text.M)`
  /* border-bottom-width: 1px;
  border-bottom-color: ${({ isWhiteTheme }) => (isWhiteTheme ? Colors.white : Colors.black)};
  padding-horizontal: 8px;
  min-width: 40px;
  height: 32px; //
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const BoxField = ({
  theme,
  size,
  label,
  value,
  onPress,
}) => {
  const TextSize = Text[size.toUpperCase()];
  const isWhiteTheme = theme === 'white';

  return (
    <TouchableOpacity onPress={onPress}>
      <Row justifyContent="space-between">
        <View>
          <Label>{label}</Label>
          <Container>
            <TextSize>
              {value}
            </TextSize>
          </Container>
        </View>
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

BoxField.propTypes = {
  theme: PropTypes.oneOf(['white', 'black']),
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  label: PropTypes.string,
  value: PropTypes.string,
  onPress: PropTypes.func,
};

BoxField.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  value: '',
  onPress: () => {},
};

export default BoxField;

*/
