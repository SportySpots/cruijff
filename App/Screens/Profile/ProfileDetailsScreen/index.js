import React from 'react';
import styled from 'styled-components/native';
import { compose } from 'react-apollo';
import { withUser, userPropTypes } from '../../../Context/User';
import ProfileDetails from '../../../Components/Profile/ProfileDetails';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileDetailsScreen = ({ user }) => (
  <Container testID="ProfileDetailsScreen">
    <ProfileDetails
      user={user}
    />
  </Container>
);

ProfileDetailsScreen.propTypes = {
  user: userPropTypes.user.isRequired,
};

const enhance = compose(
  withUser,
);

export default enhance(ProfileDetailsScreen);
