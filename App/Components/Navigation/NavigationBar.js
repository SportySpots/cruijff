import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import {BottomNavigation} from 'react-native-material-ui';
import { withNavigation } from 'react-navigation';

const NavigationBar = ({ navigation }) => (
  <BottomNavigation active={navigation.state.routeName}>
   <BottomNavigation.Action
       key="findspot"
       icon="find-in-page"
       label={I18n.t('Find spot')}
       onPress={() => navigation.navigate('findspot')}
   />

   <BottomNavigation.Action
       key="findgame"
       icon="people"
       label={I18n.t('Find game')}
       onPress={() => navigation.navigate('findgame')}
   />

   <BottomNavigation.Action
       key="profile"
       icon="account-circle"
       label={I18n.t('Profile')}
       onPress={() => navigation.navigate('profile')}
   />
  </BottomNavigation>
);
export default withNavigation(NavigationBar);
