import React from 'react';
import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import SpotsListScreen from '../../Screens/Spots/SpotsListScreen';
import SpotDetailsScreen from '../../Screens/Spots/SpotDetailsScreen';
import SpotsHeaderBtn from '../../Components/Spots/HeaderBtn';
import Game from '../../Screens/Games/GameDetailsScreen';
import SpotFilterScreen from '../../Screens/Spots/SpotsFilterScreen';
import style from './style';

const { headerTitleStyle } = style;

const SpotSearchNav = StackNavigator({
  GameDetailsScreen: {
    screen: Game,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Game details'),
      headerTitleStyle,
      headerLeft: (
        <StackBackHeader
          onPress={() => { navigation.goBack(null); }}
        />
      ),
    }),
  },
  SpotDetailsScreen: {
    screen: SpotDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Spot details'),
      headerTitleStyle,
      headerLeft: (
        <StackBackHeader
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
        <SpotsHeaderBtn
          icon="filter-list"
          onPress={() => { navigation.navigate('SpotsFilterScreen'); }}
        />
      ),
    }),
  },
  SpotsFilterScreen: {
    screen: SpotFilterScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Filter spots'),
      headerTitleStyle,
      headerLeft: null,
      headerRight: (
        <SpotsHeaderBtn
          icon="close"
          onPress={() => { navigation.goBack(null); }}
        />
      ),
    }),
  },
}, {
  initialRouteName: 'SpotsListScreen',
});

export default SpotSearchNav;
