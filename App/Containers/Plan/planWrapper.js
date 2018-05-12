import planGameAction from '../../Redux/PlanGameRedux';
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

const dispatchToProps = {
  clear: planGameAction.clearGame,
  setGameDetailField: planGameAction.setGameDetailField,
  navigate: NavigationActions.navigate,
};

const mapStateToProps = state => ({
  gameDetails: state.plan.gameDetails,
  nav: state.nav,
});

export default connect(mapStateToProps, dispatchToProps);
