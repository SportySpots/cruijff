import React from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
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

// Default is Amsterdam center
const DEFAULT_LOCATION = CITIES[0];

// The defaultValue argument is ONLY used when a component does not have a matching
// Provider above it in the tree. This can be helpful for testing components in isolation
// without wrapping them. Note: passing undefined as a Provider value does not cause
// consuming components to use defaultValue.
const defaultValue = {
  loadingLocation: false,
  location: DEFAULT_LOCATION,
  refetchLocation: () => {},
};

const LocationContext = React.createContext(defaultValue);

// TODO: this should be part of the UserProvider
export class LocationProvider extends React.Component {
  state = {
    loading: true, // set initial value to true to avoid flickering
    location: undefined,
  }

  getLocation = async () => {
    try {
      const locationJSON = await AsyncStorage.getItem('userLocation'); // { id, city, country, coords: { latitude, longitude } }
      if (locationJSON) {
        this.setState({ location: JSON.parse(locationJSON) });
      } else {
        this.setState({ location: null });
      }
    } catch (exc) {
      console.log('User location is not set', exc);
    }
  }

  async componentWillMount() {
    await this.getLocation();
    this.setState({ loading: false });
  }

  render() {
    const { loading, location } = this.state;
    const { children } = this.props;
    console.log('LOCATION STATE', this.state);

    return (
      <LocationContext.Provider
        value={{
          loadingLocation: loading,
          location,
          refetchLocation: this.getLocation,
        }}
      >
        {children}
      </LocationContext.Provider>
    );
  }
}

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const LocationConsumer = LocationContext.Consumer;

export const withLocation = Component => props => (
  <LocationConsumer>
    {locationProps => <Component {...props} {...locationProps} />}
  </LocationConsumer>
);

export const locationPropTypes = {
  loadingLocation: PropTypes.bool,
  location: PropTypes.shape({
    id: PropTypes.string,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    coords: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
  }),
  refetchLocation: PropTypes.func,
};
