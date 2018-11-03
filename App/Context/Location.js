import React from 'react';
import PropTypes from 'prop-types';
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

  async initialize() {
    await this.checkPermission();
    await this.updateLocation();
  }

  componentWillMount() {
    this.initialize();
  }

  checkPermission = async () => {
    const permissionStatus = await Permissions.check('location');
    this.setState({ permissionStatus });
    return permissionStatus;
  }

  askPermission = async () => {
    const { permissionStatus } = this.state;
    if ([PermissionStatus.DENIED, PermissionStatus.UNDETERMINED].includes(permissionStatus)) {
      try {
        await Permissions.request('location');
      } catch (e) { console.log(e); }
    }
    await this.checkPermission();
  }

  updateLocation = async () => {
    const { isUpdating, permissionStatus } = this.state;
    if (!isUpdating && permissionStatus === PermissionStatus.AUTHORIZED) {
      this.setState({ isUpdating: true });
      try {
        const location = await getCurrentPosition();
        this.setState({ location });
      } catch (e) { console.log(e); }
      this.setState({ isUpdating: false });
    }
  }

  state = {
    location: DEFAULT_LOCATION,
    isUpdating: false,
    permissionStatus: PermissionStatus.UNKNOWN,
  };

  render() {
    const { location, isUpdating, permissionStatus } = this.state;
    if (permissionStatus === PermissionStatus.UNKNOWN) {
      // block until permission status is known.
      return null;
    }
    const { children } = this.props;
    return (
      <LocationContext.Provider
        value={{
          location,
          isUpdating,
          permissionStatus,
          updateLocation: this.updateLocation,
          askPermission: this.askPermission,
        }}
      >
        {children}
      </LocationContext.Provider>
    );
  }
}

export const LocationConsumer = LocationContext.Consumer;

export const locationPropTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
};
