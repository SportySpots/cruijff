import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import GameDetailsScreens from './GameDetailsScreens';
import GamesListScreen from '../../Screens/Games/GamesListScreen';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameSearchNav = StackNavigator({
  ...GameDetailsScreens,
  GamesListScreen: {
    screen: GamesListScreen,
    navigationOptions: () => ({
      headerTitle: I18n.t('Find a game'),
    }),
  },
}, {
  initialRouteName: 'GamesListScreen',
});

export default GameSearchNav;
