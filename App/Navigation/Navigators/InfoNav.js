import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import InfoScreen from '../../Screens/InfoScreen';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const InfoNav = createStackNavigator({
  InfoScreen: {
    screen: InfoScreen,
    navigationOptions: () => ({
      headerTitle: I18n.t('Info'),
      headerTitleStyle,
    }),
  },
}, {
  initialRouteName: 'InfoScreen',
});

export default InfoNav;
