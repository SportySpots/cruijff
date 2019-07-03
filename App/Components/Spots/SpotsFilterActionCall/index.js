import React from 'react';
import PropTypes from 'prop-types';
import { withSpotFilters, spotFiltersPropTypes } from '../../../Context/SpotFilters';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotsFilterActionCall extends React.PureComponent {
  handleFilter = async (inputFields) => {
    const {
      setMaxDistance,
      setAllSports,
      setSports,
      setCity,
      onFilterSuccess,
      // onFilterError,
    } = this.props;

    const { maxDistance, allSports, selectedSportIds, city } = inputFields;

    setMaxDistance({ maxDistance });
    setAllSports({ allSports });
    setSports({ selectedSportIds });
    setCity(city);

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
  ...spotFiltersPropTypes,
};

SpotsFilterActionCall.defaultProps = {
  // onFilterError: () => {},
  onFilterSuccess: () => {},
};

export default withSpotFilters(SpotsFilterActionCall);
