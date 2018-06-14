import React from 'react';
import { TabBarTop, TabNavigator } from 'react-navigation';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import Text from '../../Text';

const Tabs = new TabNavigator({
  spots: {
    screen: () => <Text>{I18n.t('Spots')}</Text>,
  },
  games: {
    screen: () => <Text>{I18n.t('Games')}</Text>,
  },
}, {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  tabBarOptions: {
    style: {
      backgroundColor: Colors.white,
    },
    labelStyle: {
      color: 'black',
      fontWeight: '700',
    },
    indicatorStyle: {
      backgroundColor: Colors.primaryGreen,
      height: 4,
    },
  },
  initialRouteName: 'spots',
});

export default Tabs;
