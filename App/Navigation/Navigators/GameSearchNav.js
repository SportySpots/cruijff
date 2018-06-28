import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import GameDetailsNav from './GameDetailsNav';
import GamesListScreen from '../../Screens/Games/GamesListScreen';

const GameSearchNav = StackNavigator({
  GameDetailsScreen: {
    screen: GameDetailsNav,
    navigationOptions: {
      header: null,
    },
  },
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
