import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import getInitials from './utils';

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
// TODO: if firstName or lastName is not provided, display openSpotCircle
const Avatar = ({
  firstName,
  lastName,
  avatar,
  text,
  size,
}) => {
  if (
    firstName && firstName.trim().length > 0 &&
    lastName && lastName.trim().length > 0
  ) {

  }
}(
  <Circle size={size}>
    <Initials size={size}>
      {getInitials({ firstName, lastName })}
    </Initials>
  </Circle>
);

Avatar.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  avatar: PropTypes.string,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  firstName: '',
  lastName: '',
  avatar: '',
  size: 40,
};

export default Avatar;

/*
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
const UserCircle = ({ user, size }) => (
  <Circle size={size}>
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
};

UserCircle.defaultProps = {
  size: 40,
};

export default UserCircle;
*/
