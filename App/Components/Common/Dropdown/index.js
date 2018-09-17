import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Dropdown as DropdownMUI } from 'react-native-material-dropdown';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import Row from '../Row';
import Spacer from '../Spacer';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FullWidth = styled.View`
  flex: 1; /* full width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Dropdown = ({ theme, size, ...rest }) => {
  const isWhiteTheme = theme === 'white';

  return (
    <Row alignItems="center">
      <Spacer orientation="row" size="M" />
      <FullWidth>
        <DropdownMUI
          labelFontSize={Fonts.style.M.fontSize}
          labelTextStyle={{ fontFamily: Fonts.style.M.fontFamily }}    
          animationDuration={150}
          baseColor={isWhiteTheme ? Colors.white : Colors.black}
          lineWidth={1}
          rippleOpacity={0}
          dropdownPosition={-3.5}
          // Hide default carret
          renderAccessory={() => (null)}
          /* containerStyle={{
            borderWidth: 1,
            borderColor: 'red',
            padding: 0,
          }} */
          style={{
            fontSize: Fonts.style[size].fontSize,
            lineHeight: Fonts.style[size].fontSize,
            fontFamily: Fonts.style[size].fontFamily,
            paddingHorizontal: 8,
            /* borderWidth: 1,
            borderColor: 'black', */
            margin: 0,
            padding: 0,
          }}
          {...rest}
        />
      </FullWidth>
      <View>
        <Spacer orientation="column" size="L" />
        <Icon
          size={24}
          name="keyboard-arrow-down"
          color={isWhiteTheme ? Colors.white : Colors.black}
        />
      </View>
      <Spacer orientation="row" size="M" />
    </Row>
  );
};

Dropdown.propTypes = {
  theme: PropTypes.oneOf(['white', 'black']),
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  // Plus all props from react-native-material-textfield
};

Dropdown.defaultProps = {
  theme: 'black',
  size: 'M',
};

export default Dropdown;
