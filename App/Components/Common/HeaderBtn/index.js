import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Row from '../Row';
import Icon from '../Icon';

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
      <Icon
        iconSet="MaterialIcons"
        iconName={iconName}
        size={32}
        color="black"
      />
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
