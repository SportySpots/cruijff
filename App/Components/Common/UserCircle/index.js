import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import userToInitials from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Circle = styled.View`
  width: ${({ size }) => (size)};
  height: ${({ size }) => (size)};
  border-radius: ${({ size }) => (size)};
  background-color: ${Colors.primaryGreen};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
//------------------------------------------------------------------------------
const Initials = styled(Text.M)`
  font-size: ${({ size }) => (size * (18 / 40))}px;
  padding: 4px;
  text-align: center;
  color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const UserCircle = ({ user, size, style }) => (
  <Circle size={size} style={style}>
    <Initials size={size}>
      {userToInitials(user)}
    </Initials>
  </Circle>
);

UserCircle.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }).isRequired,
  size: PropTypes.number,
  style: PropTypes.object,
};

UserCircle.defaultProps = {
  size: 40,
  style: {},
};

export default UserCircle;
