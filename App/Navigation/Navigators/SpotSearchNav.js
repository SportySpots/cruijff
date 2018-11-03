import React from 'react';
import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import SpotsListScreen from '../../Screens/Spots/SpotsListScreen';
import SpotDetailsScreen from '../../Screens/Spots/SpotDetailsScreen';
import HeaderBtn from '../../Components/Common/HeaderBtn';
import GameDetailsScreens from './GameDetailsScreens';
import SpotFilterScreen from '../../Screens/Spots/SpotsFilterScreen';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const backBtn = navigation => (
  <StackBackHeader
    onPress={() => { navigation.goBack(null); }}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotSearchNav = createStackNavigator({
  ...GameDetailsScreens,
  SpotDetailsScreen: {
    screen: SpotDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Spot details'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  SpotsFilterScreen: {
    screen: SpotFilterScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Filter spots'),
      headerTitleStyle,
      headerLeft: null,
      headerRight: (
        <HeaderBtn
          iconName="close"
          onPress={() => { navigation.goBack(null); }}
        />
      ),
    }),
  },
  SpotsListScreen: {
    screen: SpotsListScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Find a spot'),
      headerTitleStyle,
      headerRight: (
        <HeaderBtn
          iconName="filter-list"
          onPress={() => { navigation.navigate('SpotsFilterScreen'); }}
        />
      ),
    }),
  },
}, {
  initialRouteName: 'SpotsListScreen',
});

export default SpotSearchNav;
