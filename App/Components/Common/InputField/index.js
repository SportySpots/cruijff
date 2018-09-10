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
        <Spacer direction="row" size="M" />
        <Input isWhiteTheme={isWhiteTheme}>
          <TextSize>{value}</TextSize>
        </Input>
        <Icon
          size={24}
          name="keyboard-arrow-down"
          color={isWhiteTheme ? Colors.white : Colors.black}
        />
        <Spacer direction="row" size="M" />
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
