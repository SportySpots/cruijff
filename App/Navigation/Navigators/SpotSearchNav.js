import React from 'react';
import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import SpotsListScreen from '../../Screens/Spots/SpotsListScreen';
import SpotDetailsScreen from '../../Screens/Spots/SpotDetailsScreen';
import HeaderBtn from '../../Components/Common/HeaderBtn';
import GameDetailsScreens from './GameDetailsScreens';
import SpotsFilterScreen from '../../Screens/Spots/SpotsFilterScreen';
import AuthScreens from './AuthScreens';
import { headerTitleStyle } from './style';
import { View } from 'react-native';
import { withLocation } from '../../Context/Location';

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
const GPSButton = withLocation(({ locationEnable, locationDisable, locationEnabled }) => (
  <HeaderBtn
    iconName={locationEnabled ? 'location-on' : 'location-off'}
    onPress={() => {
      if (locationEnabled) {
        locationDisable();
      } else {
        locationEnable();
      }
    }}
  />
));

const SpotSearchNav = createStackNavigator({
  ...AuthScreens,
  ...GameDetailsScreens,
  SpotDetailsScreen: {
    screen: SpotDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('spotDetailsScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  SpotsFilterScreen: {
    screen: SpotsFilterScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('spotsFilterScreen.navigation.title'),
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
      headerTitle: I18n.t('spotsListScreen.navigation.title'),
      headerTitleStyle,
      headerRight: (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <GPSButton />
          <HeaderBtn
            iconName="filter-list"
            onPress={() => { navigation.navigate('SpotsFilterScreen'); }}
          />
        </View>

      ),
    }),
  },
}, {
  initialRouteName: 'SpotsListScreen',
});

export default SpotSearchNav;
