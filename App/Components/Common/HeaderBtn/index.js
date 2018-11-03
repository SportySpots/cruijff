import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Row from '../Row';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledRow = styled(Row)`
  width: 60px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HeaderBtn = ({ iconName, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <StyledRow
      justifyContent="center"
      alignItems="center"
    >
      <Icon size={32} name={iconName} color="black" />
    </StyledRow>
  </TouchableOpacity>
);

HeaderBtn.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

HeaderBtn.defaultProps = {
  onPress: () => {},
};

export default HeaderBtn;
