import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import Row from '../Row';
import Spacer from '../Spacer';
import Dropdown from '../Dropdown';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FullWidth = styled.View`
  flex: 1; /* full width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DropdownBox = ({ theme, ...rest }) => {
  const isWhiteTheme = theme === 'white';

  return (
    <Row justifyContent="space-between">
      <FullWidth>
        <Dropdown
          theme={theme === 'black' ? 'transparent' : theme}
          {...rest}
        />
      </FullWidth>
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
  );
};

DropdownBox.propTypes = {
  theme: PropTypes.oneOf(['white', 'black']),
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    }).isRequired,
  ).isRequired,
  onChangeText: PropTypes.func,
  // Plus all props from react-native-material-textfield
};

DropdownBox.defaultProps = {
  theme: 'black',
  size: 'M',
  onChangeText: () => {},
};

export default DropdownBox;
