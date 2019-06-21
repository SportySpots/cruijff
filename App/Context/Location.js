/* eslint-disable max-len,no-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import geolib from 'geolib';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
// if position is more than MAX_CITY_DISTANCE meters from any city, use the position
// of the picked city instead of (GPS) coordinates.
const MAX_CITY_DISTANCE = 10000;

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

const getClosestCity = (coords) => {
  const distances = CITIES.map(city => geolib.getDistance(city.coords, coords));
  const minIndex = distances.indexOf(Math.min(...distances));
  return CITIES[minIndex];
};

const cityStick = (coords, fallbackCityID) => {
  const closestCity = getClosestCity(coords);
  const distanceToClosestCityInMeters = geolib.getDistance(coords, closestCity.coords);
  if (distanceToClosestCityInMeters < MAX_CITY_DISTANCE) {
    return coords;
  }
  // else stick to closest city
  const city = CITIES.find(c => c.id === fallbackCityID) || CITIES[0];
  return city.coords;
};

// Default is Amsterdam center
const DEFAULT_LOCATION = CITIES[0];

// The defaultValue argument is ONLY used when a component does not have a matching
// Provider above it in the tree. This can be helpful for testing components in isolation
// without wrapping them. Note: passing undefined as a Provider value does not cause
// consuming components to use defaultValue.
const defaultValue = {
  locationLoading: true, // set initial value to true to avoid flickering
  locationCoords: DEFAULT_LOCATION.coords,
  locationCity: DEFAULT_LOCATION.id,
  locationRequestPermission: () => null,
  locationUpdate: () => null,
  locationSetCity: () => null,
  locationCoordsFallback: true,
};

const LocationContext = React.createContext(defaultValue);

export class LocationProvider extends React.Component {
  state = {
    loading: defaultValue.locationLoading,
    coords: defaultValue.locationCoords,
    city: defaultValue.locationCity,
    coordsFallback: defaultValue.locationCoordsFallback,
  }

  requestPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  }

  updateLocation = async () => {
    const { city } = this.state;
    this.setState({
      loading: false,
      coords: CITIES.find(c => c.id === city).coords,
      coordsFallback: false,
    });

    // const hasPermissionOrIOS = (Platform.OS === 'ios') || await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    // if (hasPermissionOrIOS) {
    //   this.setState({ loading: true });
    //   Geolocation.getCurrentPosition(
    //     (position) => {
    //       console.log('got position', position);
    //       const { latitude, longitude } = position.coords;
    //       const coords = { latitude, longitude };
    //       const { city } = this.state;
    //       const stickedCoords = cityStick(coords, city);
    //       this.setState({ loading: false, coords: stickedCoords, coordsFallback: coords !== stickedCoords });
    //     },
    //     (error) => {
    //       /*
    //        * Error Codes
    //        * Name	                      Code	Description
    //        * PERMISSION_DENIED	        1	    Location permission is not granted
    //        * POSITION_UNAVAILABLE	      2	    Unable to determine position (not used yet)
    //        * TIMEOUT	                  3	    Location request timed out
    //        * PLAY_SERVICE_NOT_AVAILABLE	4	    Google play service is not installed or has an older version
    //        * SETTINGS_NOT_SATISFIED	    5	    Location service is not enabled or location mode is not appropriate for the current request
    //        * INTERNAL_ERROR	            -1	  Library crashed for some reason or the getCurrentActivity() returned null
    //        */
    //       console.log(error.code, error.message);
    //       this.setState({ loading: false });
    //     },
    //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    //   );
    // } else {
    //   console.log('no location permission... asking for permission');
    //   this.requestPermission();
    // }
  }

  setCity = async (city) => {
    console.log('setting city to', city);
    this.setState({ city }, this.updateLocation);
    return AsyncStorage.setItem('userCity', city);
  }

  async componentWillMount() {
    try {
      const city = await AsyncStorage.getItem('userCity');
      if (!city) {
        throw new Error(`city value: ${city}`);
      }
      if (typeof city !== 'string' || !CITIES.find(c => c.id === city)) {
        console.log('userCity is weird, resetting it.');
        await AsyncStorage.removeItem('userCity');
      } else {
        this.setState({
          city,
          coords: CITIES.find(c => c.id === city).coords,
        });
      }
    } catch (exc) {
      console.log('User city is not set', exc);
    }
    await this.updateLocation();
  }

  render() {
    const { loading, city, coords, coordsFallback } = this.state;
    const { children } = this.props;
    return (
      <LocationContext.Provider
        value={{
          locationLoading: loading,
          locationCity: city,
          locationCoords: coords,
          locationCoordsFallback: coordsFallback,
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
  }),
  locationCoordsFallback: PropTypes.bool,
  locationUpdate: PropTypes.func,
  locationSetCity: PropTypes.func,
};
