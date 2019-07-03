/* eslint-disable max-len,no-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------

export const ASYNC_STORAGE_KEY = 'LocationProviderState';

// The defaultValue argument is ONLY used when a component does not have a matching
// Provider above it in the tree. This can be helpful for testing components in isolation
// without wrapping them. Note: passing undefined as a Provider value does not cause
// consuming components to use defaultValue.
const defaultValue = {
  locationLoading: true, // set initial value to true to avoid flickering
  locationEnabled: false,
  locationCoords: {
    latitude: 0,
    longitude: 0,
  },
  locationRequestPermission: () => null,
  locationUpdate: () => null,
  locationEnable: () => null,
  locationDisable: () => null,
};

const LocationContext = React.createContext(defaultValue);

const getCurrentPositionPromise = settings => new Promise((resolve, reject) => {
  Geolocation.getCurrentPosition(resolve, reject, settings);
});

export class LocationProvider extends React.Component {
  state = {
    loading: defaultValue.locationLoading,
    enabled: defaultValue.locationEnabled,
    coords: defaultValue.locationCoords,
  }

  setState(newState, cb) {
    super.setState(newState, () => {
      if (cb) cb();
      AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(this.state));
    });
  }

  requestPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  }

  updateLocation = async () => {
    this.setState({
      loading: true,
    });

    try {
      const result = await getCurrentPositionPromise({ enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 });
      const { latitude, longitude } = result.coords;
      const coords = { latitude, longitude };
      this.setState({ loading: false, coords });
      return true;
    } catch (e) {
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
      console.log(e.code, e.message);
      this.setState({ loading: false });
      this.disable();
      return false;
    }
  }

  disable = () => {
    this.setState({ enabled: false });
  }

  enable = async () => {
    const hasPermissionOrIOS = (Platform.OS === 'ios') || await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    if (hasPermissionOrIOS) {
      this.setState({ enabled: true });
      return this.updateLocation();
    }
    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return this.enable();
    }
    this.disable();
    return false;
  }

  async componentWillMount() {
    const as = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
    if (as) {
      this.setState(JSON.parse(as));
      console.log('location state restored:', JSON.parse(as));
    }
    // await this.updateLocation();
  }

  render() {
    const { loading, enabled, coords } = this.state;
    const { children } = this.props;
    return (
      <LocationContext.Provider
        value={{
          locationLoading: loading,
          locationEnabled: enabled,
          locationCoords: coords,
          locationUpdate: this.updateLocation,
          locationEnable: this.enable,
          locationDisable: this.disable,
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

export const withLocation = Component => React.forwardRef((props, ref) => (
  <LocationConsumer>
    {locationProps => <Component ref={ref} {...props} {...locationProps} />}
  </LocationConsumer>
));

export const locationPropTypes = {
  locationLoading: PropTypes.bool,
  locationEnabled: PropTypes.bool,
  locationCoords: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  locationCoordsFallback: PropTypes.bool,
  locationUpdate: PropTypes.func,
  locationEnable: PropTypes.func,
  locationDisable: PropTypes.func,
};
