import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../Themes/Colors';
import Text from './Text';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const userToInitials = (user) => {
  const unknownUser = '?';

  if (!user || !user.first_name || !user.last_name) {
    return unknownUser;
  }

  return user.first_name.substr(0, 1) + user.last_name.substr(0, 1);
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Circle = styled.View`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size};
  background-color: ${Colors.primaryGreen};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
//------------------------------------------------------------------------------
const Initials = styled(Text.M)`
  font-size: ${props => props.size * (18 / 40)}px;
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
