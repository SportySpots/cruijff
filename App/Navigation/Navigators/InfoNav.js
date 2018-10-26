import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import InfoScreen from '../../Screens/InfoScreen';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const InfoNav = createStackNavigator({
  InfoScreen: {
    screen: InfoScreen,
    navigationOptions: () => ({
      headerTitle: I18n.t('Info'),
    }),
  },
}, {
  initialRouteName: 'InfoScreen',
});

export default InfoNav;
