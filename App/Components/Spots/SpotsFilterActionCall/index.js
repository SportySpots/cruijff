import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as spotFiltersActions from '../../../Redux/SpotFiltersRedux';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotsFilterActionCall extends React.PureComponent {
  handleFilter = async (inputFields) => {
    const {
      setMaxDistance,
      setAllSports,
      setSports,
      onFilterSuccess,
      // onFilterError,
    } = this.props;

    const { maxDistance, allSports, selectedSportIds } = inputFields;

    // Save data into redux store.
    setMaxDistance(maxDistance);
    setAllSports(allSports);
    setSports(selectedSportIds);

    // Pass event up to parent component
    onFilterSuccess();
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      filterSpots: this.handleFilter,
    };

    return children(api);
  }
}

SpotsFilterActionCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  // onFilterError: PropTypes.func,
  onFilterSuccess: PropTypes.func,
  setMaxDistance: PropTypes.func.isRequired,
  setAllSports: PropTypes.func.isRequired,
  setSports: PropTypes.func.isRequired,
};

SpotsFilterActionCall.defaultProps = {
  // onFilterError: () => {},
  onFilterSuccess: () => {},
};

const mapDispatchToProps = {
  setMaxDistance: spotFiltersActions.default.setMaxDistance,
  setAllSports: spotFiltersActions.default.setAllSports,
  setSports: spotFiltersActions.default.setSports,
};
const withRedux = connect(null, mapDispatchToProps);

export default withRedux(SpotsFilterActionCall);
