import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import UserCircle from '../../Common/UserCircle';
import ProfileUpdate from './ProfileUpdate';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Avatar = styled.View`
  align-items: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileEdit = ({ user, onEditSuccess, onEditError }) => [
  <Avatar key="avatar">
    <UserCircle user={user} size={75} />
  </Avatar>,
  <ProfileUpdate
    key="profile-update"
    user={user}
    onSuccessHook={onEditSuccess}
    onErrorHook={onEditError}
  />,
];

ProfileEdit.propTypes = {
  user: propType(userDetailsFragment).isRequired,
  onEditSuccess: PropTypes.func,
  onEditError: PropTypes.func,
};

ProfileEdit.defaultProps = {
  onEditSuccess: () => {},
  onEditError: () => {},
};

export default ProfileEdit;
