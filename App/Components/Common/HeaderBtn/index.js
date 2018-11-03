import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Row from '../Row';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HeaderBtn = ({ iconName, onPress, ...rest }) => (
  <TouchableOpacity
    onPress={onPress}
    {...rest}
  >
    <Row
      justifyContent="center"
      alignItems="center"
      width="60px"
    >
      <Icon size={32} name={iconName} color="black" />
    </Row>
  </TouchableOpacity>
);

HeaderBtn.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  // Plus all TouchableOpacity props
};

HeaderBtn.defaultProps = {
  onPress: () => {},
};

export default HeaderBtn;
