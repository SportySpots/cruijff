import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';

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
    this.setState({ loading: true });
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
    this.setState({ loading: false });
  }

  async componentWillMount() {
    await this.getLocation();
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


// import React from 'react';
// import PropTypes from 'prop-types';
// import { AsyncStorage } from 'react-native';
// import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';

// //------------------------------------------------------------------------------
// // CONSTANTS:
// //------------------------------------------------------------------------------
// export const CITIES = [
//   {
//     id: 'amsterdam',
//     city: 'Amsterdam',
//     country: 'Netherlands',
//     coords: {
//       latitude: 52.3547321,
//       longitude: 4.8284118,
//     },
//   },
//   {
//     id: 'enschede',
//     city: 'Enschede',
//     country: 'Netherlands',
//     coords: {
//       latitude: 52.2233632,
//       longitude: 6.7983365,
//     },
//   },
//   {
//     id: 'rotterdam',
//     city: 'Rotterdam',
//     country: 'Netherlands',
//     coords: {
//       latitude: 51.9280572,
//       longitude: 4.420195,
//     },
//   },
//   {
//     id: 'buenosAires',
//     city: 'Buenos Aires',
//     country: 'Argentina',
//     coords: {
//       latitude: -34.6156624,
//       longitude: -58.50351,
//     },
//   },
// ];

// // Default is Amsterdam center
// const DEFAULT_LOCATION = CITIES[0];

// // The defaultValue argument is ONLY used when a component does not have a matching
// // Provider above it in the tree. This can be helpful for testing components in isolation
// // without wrapping them. Note: passing undefined as a Provider value does not cause
// // consuming components to use defaultValue.
// const defaultValue = {
//   location: DEFAULT_LOCATION,
//   setLocation: () => {},
// };

// const LocationContext = React.createContext(defaultValue);

// export class LocationProvider extends React.Component {
//   static propTypes = {
//     children: PropTypes.node.isRequired,
//   }

//   state = {
//     location: undefined,
//   }

//   async componentWillMount() {
//     await this.getLocation();
//   }

//   setLocation = async (location) => { // { id, city, country, coords: { latitude, longitude } }
//     console.log('SET LOCATION', location);
//     try {
//       await AsyncStorage.setItem('userLocation', JSON.stringify(location));
//       this.setState({ location });
//     } catch (exc) {
//       console.log('Could not set user location', exc);
//     }
//   }

//   getLocation = async () => {
//     try {
//       const locationJSON = await AsyncStorage.getItem('userLocation'); // { id, city, country, coords: { latitude, longitude } }
//       if (locationJSON) {
//         this.setState({ location: JSON.parse(locationJSON) });
//       } else {
//         this.setState({ location: null });
//       }
//     } catch (exc) {
//       console.log('User location is not set', exc);
//     }
//   }

//   render() {
//     const { location } = this.state;
//     const { children } = this.props;

//     if (location === undefined) {
//       return <CenteredActivityIndicator />;
//     }

//     return (
//       <LocationContext.Provider
//         value={{
//           location,
//           setLocation: this.setLocation,
//         }}
//       >
//         {children}
//       </LocationContext.Provider>
//     );
//   }
// }

// export const LocationConsumer = LocationContext.Consumer;

// export const withLocation = Component => props => (
//   <LocationConsumer>
//     {locationProps => <Component {...props} {...locationProps} />}
//   </LocationConsumer>
// );

// export const locationPropTypes = {
//   setLocation: PropTypes.func,
//   location: PropTypes.shape({
//     id: PropTypes.string,
//     city: PropTypes.string.isRequired,
//     country: PropTypes.string.isRequired,
//     coords: PropTypes.shape({
//       latitude: PropTypes.number.isRequired,
//       longitude: PropTypes.number.isRequired,
//     }).isRequired,
//   }),
// };

// import React from 'react';
// import PropTypes from 'prop-types';
// import { AsyncStorage } from 'react-native';
// import Permissions from 'react-native-permissions';

// //------------------------------------------------------------------------------
// // CONSTANTS:
// //------------------------------------------------------------------------------
// export const CITIES = [
//   {
//     id: 'amsterdam',
//     city: 'Amsterdam',
//     country: 'Netherlands',
//     coords: {
//       latitude: 52.3547321,
//       longitude: 4.8284118,
//     },
//   },
//   {
//     id: 'enschede',
//     city: 'Enschede',
//     country: 'Netherlands',
//     coords: {
//       latitude: 52.2233632,
//       longitude: 6.7983365,
//     },
//   },
//   {
//     id: 'rotterdam',
//     city: 'Rotterdam',
//     country: 'Netherlands',
//     coords: {
//       latitude: 51.9280572,
//       longitude: 4.420195,
//     },
//   },
//   {
//     id: 'buenosAires',
//     city: 'Buenos Aires',
//     country: 'Argentina',
//     coords: {
//       latitude: -34.6156624,
//       longitude: -58.50351,
//     },
//   },
// ];

// // Default is Amsterdam center
// const DEFAULT_LOCATION = CITIES[0].coords;

// /*
// Permissions statuses from react-native-permissions
// Promises resolve into one of these statuses:
// authorized
//   User has authorized this permission

// denied
//   User has denied this permission at least once. On iOS this means that the user will
//   not be prompted again. Android users can be prompted multiple times until they select
//   'Never ask me again'.

// restricted
//   iOS - this means user is not able to grant this permission, either because it's not supported by
//   the device or because it has been blocked by parental controls. Android - this means that the user
//   has selected 'Never ask me again' while denying permission

// undetermined
//   User has not yet been prompted with a permission dialog
// */
// export const PermissionStatus = {
//   AUTHORIZED: 'authorized',
//   DENIED: 'denied',
//   RESTRICTED: 'restricted',
//   UNDETERMINED: 'undetermined',
//   UNKNOWN: 'unknown', // added, indicates that permission status has not been checked yet
// };

// // The defaultValue argument is ONLY used when a component does not have a matching
// // Provider above it in the tree. This can be helpful for testing components in isolation
// // without wrapping them. Note: passing undefined as a Provider value does not cause
// // consuming components to use defaultValue.
// const defaultValue = {
//   location: DEFAULT_LOCATION,
//   isUpdating: false,
//   // permissionStatus: PermissionStatus.AUTHORIZED,
//   // updateLocation: () => {},
//   // askPermission: () => {},
//   setLocation: () => {},
// };

// const LocationContext = React.createContext(defaultValue);

// // wraps navigator.geolocation.getCurrentPosition as a Promise
// // const getCurrentPosition = () => new Promise((resolve, reject) => {
// //   navigator.geolocation.getCurrentPosition(
// //     result => resolve({
// //       latitude: result.coords.latitude,
// //       longitude: result.coords.longitude,
// //     }), reject,
// //   );
// // });

// export class LocationProvider extends React.Component {
//   static propTypes = {
//     children: PropTypes.node.isRequired,
//   }

//   state = {
//     location: DEFAULT_LOCATION,
//     isUpdating: false,
//     // permissionStatus: PermissionStatus.UNKNOWN,
//   }

//   async initialize() {
//     await this.getLocation();
//     // await this.checkPermission();
//     // await this.updateLocation();
//   }

//   componentWillMount() {
//     this.initialize();
//   }

//   // checkPermission = async () => {
//   //   const permissionStatus = await Permissions.check('location');
//   //   this.setState({ permissionStatus });
//   //   return permissionStatus;
//   // }

//   // askPermission = async () => {
//   //   const { permissionStatus } = this.state;
//   //   if ([PermissionStatus.DENIED, PermissionStatus.UNDETERMINED].includes(permissionStatus)) {
//   //     try {
//   //       await Permissions.request('location');
//   //     } catch (e) { console.log(e); }
//   //   }
//   //   await this.checkPermission();
//   // }

//   // updateLocation = async () => {
//   //   const { isUpdating, permissionStatus } = this.state;
//   //   if (!isUpdating && permissionStatus === PermissionStatus.AUTHORIZED) {
//   //     this.setState({ isUpdating: true });
//   //     try {
//   //       const location = await getCurrentPosition();
//   //       this.setState({ location });
//   //     } catch (e) { console.log(e); }
//   //     this.setState({ isUpdating: false });
//   //   }
//   // }

//   setLocation = async (coords) => { // { latitude, longitude }
//     console.log('SET LOCATION', coords);
//     this.setState({ isUpdating: true });
//     try {
//       await AsyncStorage.setItem('userLocation', JSON.stringify(coords));
//       this.setState({ location: coords });
//     } catch (exc) {
//       console.log('Could not set user location', exc);
//     }
//     this.setState({ isUpdating: false });
//   }

//   getLocation = async () => {
//     this.setState({ isUpdating: true });
//     try {
//       const coordsJSON = await AsyncStorage.getItem('userLocation'); // { latitude, longitude }
//       if (coordsJSON) {
//         this.setState({ location: JSON.parse(coordsJSON) });
//       }
//     } catch (exc) {
//       console.log('User location is not set', exc);
//     }
//     this.setState({ isUpdating: false });
//   }

//   render() {
//     const { location, isUpdating } = this.state;
//     // const { location, isUpdating, permissionStatus } = this.state;
//     // if (permissionStatus === PermissionStatus.UNKNOWN) {
//     //   // block until permission status is known.
//     //   return null;
//     // }
//     const { children } = this.props;
//     return (
//       <LocationContext.Provider
//         value={{
//           location,
//           isUpdating,
//           // permissionStatus,
//           // updateLocation: this.updateLocation,
//           // askPermission: this.askPermission,
//           setLocation: this.setLocation,
//         }}
//       >
//         {children}
//       </LocationContext.Provider>
//     );
//   }
// }

// export const LocationConsumer = LocationContext.Consumer;

// export const withLocation = Component => props => (
//   <LocationConsumer>
//     {locationProps => <Component {...props} {...locationProps} />}
//   </LocationConsumer>
// );

// export const locationPropTypes = {
//   location: PropTypes.shape({
//     latitude: PropTypes.number.isRequired,
//     longitude: PropTypes.number.isRequired,
//   }),
// };
