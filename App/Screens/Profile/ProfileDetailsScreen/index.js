import React from 'react';
import styled from 'styled-components/native';
import ProfileDetails from '../../../Components/Profile/ProfileDetails';
import {observer} from "mobx-react";
import userStore from 'App/Stores/User';
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
const ProfileDetailsScreen = () => (
  <Container testID="ProfileDetailsScreen">
    <ProfileDetails
      user={userStore.user}
    />
  </Container>
);

export default observer(ProfileDetailsScreen);
