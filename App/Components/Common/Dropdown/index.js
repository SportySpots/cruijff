import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown as DropdownMUI } from 'react-native-material-dropdown';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import getInputPalette from '../../../Themes/Palettes';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// We extend Dropdown component so that is can receive an array of
// { label, value } pairs instead of only { value }
const Dropdown = React.forwardRef(({
  theme,
  size,
  data,
  onChangeText,
  label,
  style,
  disabled,
  ...rest
}, ref) => {
  const {
    fontColor,
    baseColor,
    tintColor,
    disabledColor,
    errorColor,
    lineWidth,
  } = getInputPalette(theme); // string to be used Colors[string]

  return (
    <DropdownMUI
      ref={ref}
      data={data.map(item => ({ value: item.label }))}
      onChangeText={(value) => {
        onChangeText(data.find(d => (d.label === value)));
      }}
      label={label}
      labelFontSize={Fonts.M.fontSize}
      labelTextStyle={{ fontFamily: Fonts.M.fontFamily }}
      labelHeight={1.5 * Fonts.M.fontSize}
      errorColor={Colors[errorColor]}
      animationDuration={150}
      lineWidth={lineWidth}
      disabledLineWidth={0}
      baseColor={Colors[baseColor]}
      tintColor={Colors[tintColor]}
      rippleOpacity={0}
      dropdownPosition={-8}
      dropdownOffset={{ top: 0, left: 16 }}
      itemCount={8}
      // Hide default carret
      renderAccessory={() => (null)}
      inputContainerPadding={14}
      disabled={disabled}
      style={{
        fontSize: Fonts[size].fontSize,
        fontWeight: 'normal',
        fontFamily: Fonts[size].fontFamily,
        marginTop: 8,
        color: disabled ? Colors[disabledColor] : Colors[fontColor],
        ...style,
      }}
      {...rest}
    />
  );
});

Dropdown.propTypes = {
  theme: PropTypes.oneOf(['white', 'black', 'transparent', 'mix']),
  size: PropTypes.oneOf(Object.keys(Fonts)),
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
