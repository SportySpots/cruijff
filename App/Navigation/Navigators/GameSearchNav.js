import { createStackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import GameDetailsScreens from './GameDetailsScreens';
import GamesListScreen from '../../Screens/Games/GamesListScreen';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameSearchNav = createStackNavigator({
  ...GameDetailsScreens,
  GamesListScreen: {
    screen: GamesListScreen,
    navigationOptions: () => ({
      headerTitle: I18n.t('Find a game'),
      headerTitleStyle,
    }),
  },
}, {
  initialRouteName: 'GamesListScreen',
});

export default GameSearchNav;
