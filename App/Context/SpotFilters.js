import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_FILTERS = {
  maxDistance: 20,
  allSports: true,
  selectedSportIds: [],
  flapIsOpen: true,
};

const SpotFiltersContext = React.createContext();

export class SpotFiltersProvider extends React.Component {
  state = DEFAULT_FILTERS;

  setMaxDistance = ({ maxDistance }) => {
    this.setState({ maxDistance });
  }

  setAllSports = ({ allSports }) => {
    this.setState({ allSports });
  }

  setSports = ({ selectedSportIds }) => {
    this.setState({ selectedSportIds });
  }

  closeFlap = () => {
    this.setState({ flapIsOpen: false });
  }

  render() {
    const { children } = this.props;
    const {
      maxDistance, allSports, selectedSportIds, flapIsOpen,
    } = this.state;

    return (
      <SpotFiltersContext.Provider
        value={{
          maxDistance,
          allSports,
          selectedSportIds,
          flapIsOpen,
          setMaxDistance: this.setMaxDistance,
          setAllSports: this.setAllSports,
          setSports: this.setSports,
          closeFlap: this.closeFlap,
        }}
      >
        {children}
      </SpotFiltersContext.Provider>
    );
  }
}

SpotFiltersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SpotFiltersConsumer = SpotFiltersContext.Consumer;

export const withSpotFilters = Component => props => (
  <SpotFiltersConsumer>
    {spotFiltersProps => <Component {...props} {...spotFiltersProps} />}
  </SpotFiltersConsumer>
);

export const spotFiltersPropTypes = {
  maxDistance: PropTypes.number.isRequired,
  allSports: PropTypes.bool.isRequired,
  selectedSportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  flapIsOpen: PropTypes.bool.isRequired,
  setMaxDistance: PropTypes.func.isRequired,
  setAllSports: PropTypes.func.isRequired,
  setSports: PropTypes.func.isRequired,
  closeFlap: PropTypes.func.isRequired,
};
