import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
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
  let IconNative = null;

  switch (iconSet) {
    case 'MaterialIcons':
      IconNative = MaterialIcon;
      break;
    case 'MaterialCommunityIcons':
      IconNative = MaterialCommunityIcon;
      break;
    case 'Ionicons':
      IconNative = Ionicon;
      break;
    default:
      throw new Error('Unknown icon set', iconSet);
  }

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
  iconSet: PropTypes.oneOf([
    'MaterialIcons',
    'MaterialCommunityIcons',
    'Ionicons',
  ]).isRequired,
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
