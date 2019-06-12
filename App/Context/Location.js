/* eslint-disable max-len,no-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

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
  locationLoading: true, // set initial value to true to avoid flickering
  locationCoords: DEFAULT_LOCATION.coords,
  locationCity: DEFAULT_LOCATION.city,
  locationRequestPermission: () => null,
  locationUpdate: () => null,
  locationSetCity: () => null,
};

const LocationContext = React.createContext(defaultValue);

export class LocationProvider extends React.Component {
  state = {
    loading: defaultValue.locationLoading,
    coords: defaultValue.locationCoords,
    city: defaultValue.locationCity,
  }

  requestPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  }

  updateLocation = async () => {
    const hasPermissionOrIOS = (Platform.OS === 'ios') || await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (hasPermissionOrIOS) {
      this.setState({ loading: true });
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('got position', position);
          const { latitude, longitude } = position.coords;
          this.setState({ loading: false, coords: { latitude, longitude } });
        },
        (error) => {
          /*
           * Error Codes
           * Name	                      Code	Description
           * PERMISSION_DENIED	        1	    Location permission is not granted
           * POSITION_UNAVAILABLE	      2	    Unable to determine position (not used yet)
           * TIMEOUT	                  3	    Location request timed out
           * PLAY_SERVICE_NOT_AVAILABLE	4	    Google play service is not installed or has an older version
           * SETTINGS_NOT_SATISFIED	    5	    Location service is not enabled or location mode is not appropriate for the current request
           * INTERNAL_ERROR	            -1	  Library crashed for some reason or the getCurrentActivity() returned null
           */
          console.log(error.code, error.message);
          this.setState({ loading: false });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      console.log('no location permission...');
      this.requestPermission();
    }
  }

  setCity = async (city) => {
    this.setState({ city });
    return AsyncStorage.setItem('userCity', city);
  }

  async componentWillMount() {
    try {
      this.setState({ city: await AsyncStorage.getItem('userCity') });
    } catch (exc) {
      console.log('User location is not set', exc);
    }
    await this.updateLocation();
  }

  render() {
    const { loading, city, coords } = this.state;
    const { children } = this.props;

    return (
      <LocationContext.Provider
        value={{
          locationLoading: loading,
          locationCity: city,
          locationCoords: coords,
          locationUpdate: this.updateLocation,
          locationSetCity: this.setCity,
          locationRequestPermission: this.requestPermission,
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
  locationLoading: PropTypes.bool,
  locationCity: PropTypes.string,
  locationCoords: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  locationUpdate: PropTypes.func,
  locationSetCity: PropTypes.func,
};
