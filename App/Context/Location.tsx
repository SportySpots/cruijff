/* eslint-disable max-len,no-tabs */
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { PermissionsAndroid, PermissionStatus, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------

export const ASYNC_STORAGE_KEY = 'LocationProviderState';

export interface ICoords {
  latitude: number;
  longitude: number;
}

interface IState {
  locationLoading: boolean;
  locationEnabled: boolean;
  locationGPSCoords: ICoords;
  locationMapCoords: ICoords;
  locationMapZoom: number;
  locationHeading: number;
}

interface IProps extends IState {
  locationRequestPermission: () => Promise<boolean>;
  locationUpdate: () => Promise<boolean>;
  locationEnable: () => Promise<boolean>;
  locationDisable: () => void;
  locationSetMapCoords: (coords: ICoords) => void;
  locationSetMapZoom: (zoom: number) => void;
}

// The defaultValue argument is ONLY used when a component does not have a matching
// Provider above it in the tree. This can be helpful for testing components in isolation
// without wrapping them. Note: passing undefined as a Provider value does not cause
// consuming components to use defaultValue.
const defaultValue: IProps = {
  locationLoading: true, // set initial value to true to avoid flickering
  locationEnabled: false,
  locationGPSCoords: {
    latitude: 52.370216,
    longitude: 4.895168,
  },
  locationMapCoords: {
    latitude: 52.370216,
    longitude: 4.895168,
  },
  locationHeading: 0,
  locationRequestPermission: async () => false,
  locationUpdate: async () => false,
  locationEnable: async () => false,
  locationDisable: () => null,
  locationSetMapCoords: (coords: ICoords) => null,
  locationMapZoom: 10,
  locationSetMapZoom: (zoom: number) => null,
};

export const LocationContext = React.createContext(defaultValue);

// wraps Geolocation.getCurrentPosition as a Promise.
const getCurrentPositionPromise = (options?: Geolocation.GeoOptions) => new Promise(
  (resolve: Geolocation.SuccessCallback, reject: Geolocation.ErrorCallback) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
});

export class LocationProvider extends React.Component<{children: any}, IState> {
  state: IState = {
    locationLoading: defaultValue.locationLoading,
    locationEnabled: defaultValue.locationEnabled,
    locationGPSCoords: defaultValue.locationGPSCoords, // gps coordinates
    locationMapCoords: defaultValue.locationMapCoords, // coordinates from map panning
    locationMapZoom: defaultValue.locationMapZoom,
    locationHeading: defaultValue.locationHeading,
  };

  componentDidUpdate() {
    console.log('saving to async storage');
    AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(this.state));
  }

  requestPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }
    const response: PermissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return response === 'granted';
  }

  updateLocation = async () => {
    this.setState({
      locationLoading: true,
    });

    try {
      const result = await getCurrentPositionPromise({ enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 });
      const { latitude, longitude, heading } = result.coords;
      if (!latitude || !longitude) {
        throw new Error('couldn\'t get coordinates');
      }
      const coords: ICoords = { latitude, longitude };
      this.setState({ locationLoading: false, locationGPSCoords: coords, locationHeading: heading || 0 });
      return true;
    } catch (e) {
      /*
         * Error Codes
         * Name	                      Code	Description
         * PERMISSION_DENIED	        1	    Location permission is not granted
         * POSITION_UNAVAILABLE	      2	    Unable to determine position (not used yet)
         * TIMEOUT	                  3	    Location request timed out
         * PLAY_SERVICE_NOT_AVAILABLE	4	    Google play service is not installed or has an
         *                                    older version
         * SETTINGS_NOT_SATISFIED	    5	    Location service is not enabled or location mode is not
         *                                    appropriate for the current request
         * INTERNAL_ERROR	            -1	  Library crashed for some reason or the
         *                                    getCurrentActivity() returned null
         */
      console.log(e.code, e.message);
      this.setState({ locationLoading: false });
      this.disable();
      return false;
    }
  }

  disable = () => {
    this.setState({ locationEnabled: false });
  }

  enable = async () => {
    console.log(1);
    const hasPermissionOrIOS = (Platform.OS === 'ios') ||
      await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (hasPermissionOrIOS) {
      this.setState({ locationEnabled: true });
      return this.updateLocation();
    }

    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    console.log('result', result);
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return this.enable();
    }
    this.disable();
    return false;
  }

  setMapCoords = (coords: ICoords) => {
    this.setState({
      locationMapCoords: coords,
    });
  }
  setMapZoom = (zoom: number) => {
    this.setState({
      locationMapZoom: zoom,
    });
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
    const { children } = this.props;
    const providerValue = {
      ...this.state,
      locationUpdate: this.updateLocation,
      locationEnable: this.enable,
      locationDisable: this.disable,
      locationRequestPermission: this.requestPermission,
      locationSetMapCoords: this.setMapCoords,
      locationSetMapZoom: this.setMapZoom,
    };

    return (
      <LocationContext.Provider
        value={providerValue}
      >
        {children}
      </LocationContext.Provider>
    );
  }
}

export const LocationConsumer = LocationContext.Consumer;

export const withLocation = <P extends object>(Component: React.ComponentType<IProps & P>) => {
  const Wrapper = (props: P, ref) => (
    <LocationConsumer>
      {(locationProps: IProps) => <Component ref={ref} {...props} {...locationProps} />}
    </LocationConsumer>
  )
  return React.forwardRef(Wrapper);
}

