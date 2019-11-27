import { action, observable } from 'mobx';
import { persist } from "./utils";
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, PermissionStatus, Platform } from "react-native";

export const ASYNC_STORAGE_KEY = 'LocationProviderState';

export interface ICoords {
  latitude: number;
  longitude: number;
}

// wraps Geolocation.getCurrentPosition as a Promise.
const getCurrentPositionPromise = (options?: Geolocation.GeoOptions) => new Promise(
  (resolve: Geolocation.SuccessCallback, reject: Geolocation.ErrorCallback) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
  });

export class SpotFiltersStore {
  @observable locationLoading = true;
  @observable locationEnabled = false;
  @observable locationGPSCoords: ICoords = {
    latitude: 52.370216,
    longitude: 4.895168,
  };
  @observable locationMapCoords: ICoords = {
    latitude: 52.370216,
    longitude: 4.895168,
  };
  @observable locationMapZoom = 10;

  requestPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }
    const response: PermissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return response === 'granted';
  }

  @action updateLocation = async () => {
      this.locationLoading = true;
      try {
        const result = await getCurrentPositionPromise({
          enableHighAccuracy: true, timeout: 5000, maximumAge: 10000
        });
        const { latitude, longitude } = result.coords;
        if (!latitude || !longitude) {
          throw new Error('couldn\'t get coordinates');
        }
        const coords: ICoords = { latitude, longitude };
        this.locationLoading = false;
        this.locationGPSCoords = coords;
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
        this.locationLoading = false;
        this.locationEnabled = false;
        return false;
      }
  }

  @action enable = async () => {
    console.log(1);
    const hasPermissionOrIOS = (Platform.OS === 'ios') ||
      await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (hasPermissionOrIOS) {
      this.locationEnabled = true;
      return this.updateLocation();
    }

    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    console.log('result', result);
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return this.enable();
    }
    this.locationEnabled = false;
    return false;
  }

}

const store = new SpotFiltersStore();
persist(store, ASYNC_STORAGE_KEY);

export default store;
