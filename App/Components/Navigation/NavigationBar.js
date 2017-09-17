import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import {BottomNavigation} from 'react-native-material-ui';
import { withNavigation } from 'react-navigation';

const NavigationBar = ({ navigation }) => (
  <BottomNavigation active={navigation.state.routeName}>
   <BottomNavigation.Action
       key="FindSpotScreen"
       icon="find-in-page"
       label={I18n.t('Find spot')}
       onPress={() => navigation.navigate('FindSpotScreen')}
   />

   <BottomNavigation.Action
       key="FindGameScreen"
       icon="people"
       label={I18n.t('Find game')}
       onPress={() => navigation.navigate('FindGameScreen')}
   />

   <BottomNavigation.Action
       key="ProfileScreen"
       icon="account-circle"
       label={I18n.t('Profile')}
       onPress={() => navigation.navigate('ProfileScreen')}
   />
  </BottomNavigation>
);
export default withNavigation(NavigationBar);
