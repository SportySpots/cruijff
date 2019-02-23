import React from 'react';
import styled from 'styled-components/native';
import { compose } from 'react-apollo';
import { withUser, userPropTypes } from '../../../Context/User';
import { withLocation, locationPropTypes } from '../../../Context/Location';
import Colors from '../../../Themes/Colors';
import ProfileDetails from '../../../Components/Profile/ProfileDetails';

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
const ProfileDetailsScreen = ({ user, location }) => (
  <Container testID="ProfileDetailsScreen">
    <ProfileDetails
      user={user}
      location={location}
    />
  </Container>
);

ProfileDetailsScreen.propTypes = {
  user: userPropTypes.user.isRequired,
  location: locationPropTypes.user.isRequired,
};

const enhance = compose(
  withUser,
  withLocation,
);

export default enhance(ProfileDetailsScreen);
