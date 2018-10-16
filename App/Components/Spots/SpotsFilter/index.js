import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { connect } from 'react-redux';
import * as spotFiltersActions from '../../../Redux/SpotFiltersRedux';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import SpotsFilterForm from '../SpotsFilterForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotsFilter extends React.PureComponent {
  handleSuccess = async ({ maxDistance, allSports, selectedSportIds }) => {
    const {
      setMaxDistance,
      setAllSports,
      setSports,
      onSuccessHook,
    } = this.props;

    // Save data into redux store.
    setMaxDistance(maxDistance);
    setAllSports(allSports);
    setSports(selectedSportIds);

    // Pass event up to parent component
    onSuccessHook();
  }

  render() {
    return (
      <SpotsFilterForm
        {...this.props}
        // Overwrite on onSuccessHook
        onSuccessHook={this.handleSuccess}
      />
    );
  }
}

SpotsFilter.propTypes = {
  sports: PropTypes.arrayOf(propType(sportFragment)).isRequired,
  maxDistance: PropTypes.number.isRequired,
  allSports: PropTypes.bool.isRequired,
  selectedSportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  setMaxDistance: PropTypes.func.isRequired,
  setAllSports: PropTypes.func.isRequired,
  setSports: PropTypes.func.isRequired,
};

SpotsFilter.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onSuccessHook: () => {},
};

const mapDispatchToProps = {
  setMaxDistance: spotFiltersActions.default.setMaxDistance,
  setAllSports: spotFiltersActions.default.setAllSports,
  setSports: spotFiltersActions.default.setSports,
};
const withRedux = connect(null, mapDispatchToProps);

export default withRedux(SpotsFilter);
