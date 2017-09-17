import React, { Component } from 'react';
import {BottomNavigation} from 'react-native-material-ui';
import { withNavigation } from 'react-navigation';

const NavigationBar = ({ navigation }) => (
  <BottomNavigation active={navigation.state.routeName}>
   <BottomNavigation.Action
       key="findspot"
       icon="find-in-page"
       label="Find spot"
       onPress={() => navigation.navigate('findspot')}
   />

   <BottomNavigation.Action
       key="findgame"
       icon="people"
       label="Find game"
       onPress={() => navigation.navigate('findgame')}
   />

   <BottomNavigation.Action
       key="profile"
       icon="account-circle"
       label="Profile"
       onPress={() => navigation.navigate('profile')}
   />
  </BottomNavigation>
);
export default withNavigation(NavigationBar);
