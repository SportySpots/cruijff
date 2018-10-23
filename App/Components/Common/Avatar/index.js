import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import themeImages from '../../../Themes/Images';
import userNameAvatarFragment from '../../../GraphQL/Users/Fragments/userNameAvatar';
import Text from '../Text';
import userToInitials from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Circle = styled.View`
  width: ${({ size }) => (size)};
  height: ${({ size }) => (size)};
  border-radius: ${({ size }) => (size)};
  background-color: ${({ bgColor }) => (bgColor || Colors.primaryGreen)};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
//------------------------------------------------------------------------------
const StyledImage = styled.Image`
  width: ${({ size }) => (size)};
  height: ${({ size }) => (size)};
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
const Avatar = ({ user, text, size }) => {
  const avatar = (
    user &&
    user.profile &&
    user.profile.avatar
  ) ? user.profile.avatar : '';

  if (avatar) {
    return (
      <Circle size={size}>
        <StyledImage
          source={avatar}
          size={size}
        />
      </Circle>
    );
  }

  const hasName = (
    user &&
    user.first_name &&
    user.first_name.trim().length > 0 &&
    user.last_name &&
    user.last_name.trim().length > 0
  );

  if (hasName) {
    return (
      <Circle size={size}>
        <Initials size={size}>
          {userToInitials(user)}
        </Initials>
      </Circle>
    );
  }

  if (text && text.trim().length > 0) {
    return (
      <Circle size={size}>
        <Text.SM style={{ color: Colors.white }}>
          {text}
        </Text.SM>
      </Circle>
    );
  }

  // If no user and no text, display default avatar
  return (
    <Circle bgColor={Colors.transparent} size={size}>
      <StyledImage
        source={themeImages.spotOpenCircle}
        size={size}
      />
    </Circle>
  );
};

Avatar.propTypes = {
  user: propType(userNameAvatarFragment),
  text: PropTypes.string,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  user: null,
  text: '',
  size: 40,
};

export default Avatar;
