import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../Themes/Colors';
import ProfileDetails from '../../../Components/Profile/ProfileDetails';
import { userPropTypes, withUser } from '../../../Context/User';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileDetailsScreen = ({ user }) => (
  <Container testID="ProfileDetailsScreen">
    <ProfileDetails user={user} />
  </Container>
);

ProfileDetailsScreen.propTypes = {
  user: userPropTypes.user.isRequired,
};

export default withUser(ProfileDetailsScreen);
