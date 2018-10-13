import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown as DropdownMUI } from 'react-native-material-dropdown';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// We extend Dropdown component so that is can receive an array of
// { label, value } pairs instead of only { value }
const Dropdown = ({
  theme,
  size,
  data,
  onChangeText,
  label,
  style,
  disabled,
  ...rest
}) => {
  const isWhiteTheme = theme === 'white';
  const isTransparentTheme = theme === 'transparent';

  return (
    <DropdownMUI
      data={data.map(item => ({ value: item.label }))}
      onChangeText={(value) => {
        onChangeText(data.find(d => (d.label === value)));
      }}
      label={label}
      labelFontSize={Fonts.style.M.fontSize}
      labelTextStyle={{ fontFamily: Fonts.style.M.fontFamily }}
      labelHeight={1.5 * Fonts.style.M.fontSize}
      animationDuration={150}
      baseColor={isWhiteTheme ? Colors.white : Colors.black}
      lineWidth={isTransparentTheme ? 0 : 1}
      disabledLineWidth={0}
      rippleOpacity={0}
      dropdownPosition={-8}
      dropdownOffset={{ top: 0, left: 16 }}
      itemCount={8}
      // Hide default carret
      renderAccessory={() => (null)}
      /* containerStyle={{
        borderWidth: 1,
        borderColor: 'red',
        padding: 0,
      }} */
      inputContainerPadding={14}
      disabled={disabled}
      style={{
        fontSize: Fonts.style[size].fontSize,
        fontWeight: 'normal',
        fontFamily: Fonts.style[size].fontFamily,
        lineHeight: Fonts.style[size].fontSize,
        color: isWhiteTheme ? Colors.white : (disabled ? Colors.gray : Colors.black),
        /* borderWidth: 1,
        borderColor: 'black', */
        padding: 0,
        // paddingBottom: 4,
        ...style,
      }}
      {...rest}
    />
  );
};

Dropdown.propTypes = {
  theme: PropTypes.oneOf(['white', 'black', 'transparent']),
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    }).isRequired,
  ).isRequired,
  onChangeText: PropTypes.func,
  label: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
  disabled: PropTypes.bool,
  // Plus all props from react-native-material-textfield
};

Dropdown.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  onChangeText: () => {},
  style: {},
  disabled: false,
};

export default Dropdown;
