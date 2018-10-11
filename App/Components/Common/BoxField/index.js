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
  min-width: 40px; */
  height: 34px;
  display: flex;
  justify-content: flex-end;
  /* border: 1px solid red; */
`;
//------------------------------------------------------------------------------
const Label = styled(Text.M)`
  /* border-bottom-width: 1px;
  border-bottom-color: ${({ isWhiteTheme }) => (isWhiteTheme ? Colors.white : Colors.black)};
  padding-horizontal: 8px;
  min-width: 40px;
  height: 32px; */
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
