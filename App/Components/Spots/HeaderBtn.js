import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.Text`
  padding: 20px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HeaderBtn = ({ icon, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flex: 1,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: Colors.lightGray,
    }}
  >
    <Container>
      <Icon name={icon} size={24} color="black" />
    </Container>
  </TouchableOpacity>
);

HeaderBtn.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

HeaderBtn.defaultProps = {
  onPress: () => {},
};

export default HeaderBtn;
