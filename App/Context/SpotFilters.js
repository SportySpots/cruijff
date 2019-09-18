import React from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

const DEFAULT_FILTERS = {
  maxDistance: 20,
  allSports: true,
  selectedSportIds: [],
  // flapIsOpen: true,
};

export const ASYNC_STORAGE_KEY = 'SpotFilterProviderState';


export const SpotFiltersContext = React.createContext();

export class SpotFiltersProvider extends React.Component {
  state = DEFAULT_FILTERS;

  setState(newState, cb) {
    super.setState(newState, () => {
      if (cb) cb();
      AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(this.state));
    });
  }

  async componentWillMount() {
    const as = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
    if (as) {
      this.setState(JSON.parse(as));
      console.log('SpotFilter state restored: ', JSON.parse(as));
    }
  }

  setMaxDistance = ({ maxDistance }) => {
    this.setState({ maxDistance });
  }

  setAllSports = ({ allSports }) => {
    this.setState({ allSports });
  }

  setSports = ({ selectedSportIds }) => {
    this.setState({ selectedSportIds });
  }

  /* closeFlap = () => {
    this.setState({ flapIsOpen: false });
  } */

  render() {
    const { children } = this.props;
    const {
      maxDistance,
      allSports,
      selectedSportIds,
      // flapIsOpen,
    } = this.state;

    return (
      <SpotFiltersContext.Provider
        value={{
          maxDistance,
          allSports,
          selectedSportIds,
          // flapIsOpen,
          setMaxDistance: this.setMaxDistance,
          setAllSports: this.setAllSports,
          setSports: this.setSports,
          // closeFlap: this.closeFlap,
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
  // flapIsOpen: PropTypes.bool.isRequired,
  setMaxDistance: PropTypes.func.isRequired,
  setAllSports: PropTypes.func.isRequired,
  setSports: PropTypes.func.isRequired,
  // closeFlap: PropTypes.func.isRequired,
};
