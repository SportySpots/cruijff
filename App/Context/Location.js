import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import Permissions from 'react-native-permissions';

// default is Amsterdam center
const DEFAULT_LOCATION = {
  latitude: 52.379189,
  longitude: 4.899431,
};

/*
Permissions statuses from react-native-permissions
Promises resolve into one of these statuses:
authorized
  User has authorized this permission

denied
  User has denied this permission at least once. On iOS this means that the user will
  not be prompted again. Android users can be prompted multiple times until they select
  'Never ask me again'.

restricted
  iOS - this means user is not able to grant this permission, either because it's not supported by
  the device or because it has been blocked by parental controls. Android - this means that the user
  has selected 'Never ask me again' while denying permission

undetermined
  User has not yet been prompted with a permission dialog
*/
export const PermissionStatus = {
  AUTHORIZED: 'authorized',
  DENIED: 'denied',
  RESTRICTED: 'restricted',
  UNDETERMINED: 'undetermined',
  UNKNOWN: 'unknown', // added, indicates that permission status has not been checked yet
};

const LocationContext = React.createContext();

// wraps navigator.geolocation.getCurrentPosition as a Promise
const getCurrentPosition = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    result => resolve({
      latitude: result.coords.latitude,
      longitude: result.coords.longitude,
    }), reject,
  );
});

export class LocationProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    location: DEFAULT_LOCATION,
    isUpdating: false,
    // permissionStatus: PermissionStatus.UNKNOWN,
  }

  async initialize() {
    await this.getLocation();
    // await this.checkPermission();
    // await this.updateLocation();
  }

  componentWillMount() {
    this.initialize();
  }

  // checkPermission = async () => {
  //   const permissionStatus = await Permissions.check('location');
  //   this.setState({ permissionStatus });
  //   return permissionStatus;
  // }

  // askPermission = async () => {
  //   const { permissionStatus } = this.state;
  //   if ([PermissionStatus.DENIED, PermissionStatus.UNDETERMINED].includes(permissionStatus)) {
  //     try {
  //       await Permissions.request('location');
  //     } catch (e) { console.log(e); }
  //   }
  //   await this.checkPermission();
  // }

  // updateLocation = async () => {
  //   const { isUpdating, permissionStatus } = this.state;
  //   if (!isUpdating && permissionStatus === PermissionStatus.AUTHORIZED) {
  //     this.setState({ isUpdating: true });
  //     try {
  //       const location = await getCurrentPosition();
  //       this.setState({ location });
  //     } catch (e) { console.log(e); }
  //     this.setState({ isUpdating: false });
  //   }
  // }

  setLocation = async (coords) => { // { latitude, longitude }
    console.log('SET LOCATION', coords);
    this.setState({ isUpdating: true });
    try {
      await AsyncStorage.setItem('userLocation', JSON.stringify(coords));
      this.setState({ location: coords });
    } catch (exc) {
      console.log('Could not set user location', exc);
    }
    this.setState({ isUpdating: false });
  }

  getLocation = async () => {
    this.setState({ isUpdating: true });
    try {
      const coordsJSON = await AsyncStorage.getItem('userLocation'); // { latitude, longitude }
      this.setState({ location: JSON.parse(coordsJSON) });
    } catch (exc) {
      console.log('User location is not set', exc);
    }
    this.setState({ isUpdating: false });
  }

  render() {
    const { location, isUpdating } = this.state;
    // const { location, isUpdating, permissionStatus } = this.state;
    // if (permissionStatus === PermissionStatus.UNKNOWN) {
    //   // block until permission status is known.
    //   return null;
    // }
    const { children } = this.props;
    return (
      <LocationContext.Provider
        value={{
          location,
          isUpdating,
          // permissionStatus,
          // updateLocation: this.updateLocation,
          // askPermission: this.askPermission,
          setLocation: this.setLocation,
        }}
      >
        {children}
      </LocationContext.Provider>
    );
  }
}

export const LocationConsumer = LocationContext.Consumer;

export const withLocation = Component => props => (
  <LocationConsumer>
    {locationProps => <Component {...props} {...locationProps} />}
  </LocationConsumer>
);

export const locationPropTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
};
