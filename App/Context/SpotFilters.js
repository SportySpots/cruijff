import React from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

export const CITIES = [
  {
    id: 'amsterdam',
    city: 'Amsterdam',
    country: 'Netherlands',
    coords: {
      latitude: 52.3547321,
      longitude: 4.8284118,
    },
  },
  {
    id: 'enschede',
    city: 'Enschede',
    country: 'Netherlands',
    coords: {
      latitude: 52.2233632,
      longitude: 6.7983365,
    },
  },
  {
    id: 'rotterdam',
    city: 'Rotterdam',
    country: 'Netherlands',
    coords: {
      latitude: 51.9280572,
      longitude: 4.420195,
    },
  },
  {
    id: 'barcelona',
    city: 'Barcelona',
    country: 'Spain',
    coords: {
      latitude: 41.3948975,
      longitude: 2.0785562,
    },
  },
  {
    id: 'buenosAires',
    city: 'Buenos Aires',
    country: 'Argentina',
    coords: {
      latitude: -34.6156624,
      longitude: -58.50351,
    },
  },
];

const DEFAULT_FILTERS = {
  maxDistance: 20,
  allSports: true,
  selectedSportIds: [],
  city: null,
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

  setCity = (cityID) => {
    this.setState({ city: cityID });
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
      city,
      // flapIsOpen,
    } = this.state;

    return (
      <SpotFiltersContext.Provider
        value={{
          maxDistance,
          allSports,
          selectedSportIds,
          city,
          // flapIsOpen,
          setMaxDistance: this.setMaxDistance,
          setAllSports: this.setAllSports,
          setSports: this.setSports,
          setCity: this.setCity,
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
  city: PropTypes.string,
  maxDistance: PropTypes.number.isRequired,
  allSports: PropTypes.bool.isRequired,
  selectedSportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  // flapIsOpen: PropTypes.bool.isRequired,
  setMaxDistance: PropTypes.func.isRequired,
  setAllSports: PropTypes.func.isRequired,
  setSports: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  // closeFlap: PropTypes.func.isRequired,
};
