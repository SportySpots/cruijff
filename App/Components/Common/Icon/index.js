import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Icon = ({
  iconSet,
  iconName,
  color,
  size,
  ...rest
}) => {
  const IconNative = iconSet === 'MaterialIcons' ? MaterialIcon : MaterialCommunityIcon;

  return (
    <IconNative
      name={iconName}
      size={size}
      color={Colors[color]}
      {...rest}
    />
  );
};

Icon.propTypes = {
  iconSet: PropTypes.oneOf(['MaterialIcons', 'MaterialCommunityIcons']).isRequired,
  iconName: PropTypes.string.isRequired,
  color: PropTypes.oneOf(Object.keys(Colors)),
  size: PropTypes.number,
  // Plus all other props associated to native Text comp
};

Icon.defaultProps = {
  color: 'black',
  size: 24,
};

export default Icon;
