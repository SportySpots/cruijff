import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from '../Icon';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: probably need to use absolute-relative position to add white bg.
// backgroundColor prop doesn't work as expected :(
// TODO: use some checkbox lib!
const Checkbox = ({ theme, checked, ...rest }) => {
  const isWhiteTheme = theme === 'white';

  const uncheckedIcon = (
    <Icon
      iconSet="MaterialIcons"
      iconName="check-box-outline-blank"
      size={48}
      color={isWhiteTheme ? 'white' : 'black'}
    />
  );

  const checkedIcon = (
    <Icon
      iconSet="MaterialIcons"
      iconName="check-box"
      size={48}
      color="actionYellow"
    />
  );

  return (
    <TouchableOpacity {...rest}>
      {checked ? checkedIcon : uncheckedIcon}
    </TouchableOpacity>
  );
};

Checkbox.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
  checked: PropTypes.bool,
  // Plus all props from native TouchableOpacity
};

Checkbox.defaultProps = {
  theme: 'black',
  checked: false,
};

export default Checkbox;
