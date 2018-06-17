import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../Themes/Colors';
import Text from './Text';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const userToInitials = (user) => {
  // const splitName = user.name.split(' ')
  // if (splitName.length > 1) {
  //   return splitName[0][0] + splitName[1][0]
  // } else {
  //   return user.name.substr(0, 1)
  // }
  if (user.first_name && user.last_name) {
    return user.first_name.substr(0, 1) + user.last_name.substr(0, 1);
  }
  return '?';
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Circle = styled.View`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 40;
  background-color: ${Colors.primaryGreen};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
//------------------------------------------------------------------------------
const Initials = styled(Text.M)`
  padding: 4px;
  text-align: center;
  color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const UserCircle = ({ user, size, style }) => (
  <Circle size={size} style={style}>
    <Initials>
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
