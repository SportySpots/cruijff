/* import { withNavigation, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import planGameAction from '../../Redux/PlanGameRedux';

const mapStateToProps = state => ({
  gameDetails: state.plan.gameDetails,
  nav: state.nav,
  user: state.user,
});

const dispatchToProps = {
  clear: planGameAction.clearGame,
  setGameDetailField: planGameAction.setGameDetailField,
  navigate: NavigationActions.navigate,
};

const withRedux = connect(mapStateToProps, dispatchToProps);

const enhance = compose(
  withNavigation,
  withRedux,
);

export default enhance;
*/
