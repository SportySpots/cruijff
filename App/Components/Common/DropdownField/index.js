/* import React from 'react';
import PropTypes from 'prop-types';
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
  flex: 1; /* full width //
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DropdownField = ({ theme, ...rest }) => {
  const isWhiteTheme = theme === 'white';

  return (
    <Row alignItems="center">
      <Spacer orientation="row" size="M" />
      <FullWidth>
        <Dropdown
          theme={theme}
          style={{ paddingHorizontal: 8 }}
          {...rest}
        />
      </FullWidth>
      {/* Add custom carret //}
      <Icon
        size={24}
        name="keyboard-arrow-down"
        color={isWhiteTheme ? Colors.white : Colors.black}
        style={{ height: 40 }}
      />
      <Spacer orientation="row" size="M" />
    </Row>
  );
};

DropdownField.propTypes = {
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

DropdownField.defaultProps = {
  theme: 'black',
  size: 'M',
  onChangeText: () => {},
};

export default DropdownField;
*/
