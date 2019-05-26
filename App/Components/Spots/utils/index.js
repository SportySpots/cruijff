import { showLocation } from 'react-native-map-link';

// ------------------------------------------------------------------------------
// export const getCurrentPosition = (options = {}) => new Promise((resolve, reject) => {
//   navigator.geolocation.getCurrentPosition(resolve, reject, options);
// });
const getCurrentPosition = (options = {}) => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    result => resolve({
      latitude: result.coords.latitude,
      longitude: result.coords.longitude,
    }),
    reject,
    options,
  );
});
// ------------------------------------------------------------------------------
export const getSpotLocation = spot => ({
  latitude: spot && spot.address && spot.address.lat,
  longitude: spot && spot.address && spot.address.lng,
});
// -----------------------------------------------------------------------------
export const openGoogleMapsLocation = ({ latLng, title = '' }) => {
  showLocation({
    ...latLng,
    title,
    // Force GoogleMaps to use the latLng from the query instead of the title
    googleForceLatLon: true,
  });
};
// -----------------------------------------------------------------------------
export const openGoogleMapsDirections = async ({ latLng, title = '' }) => {
  if (!('geolocation' in navigator)) {
    console.log('Geolocation is not available');
    return;
  }

  // Get user's position from navigator
  const options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 100000,
  };

  let position;
  try {
    position = await getCurrentPosition(options);
  } catch (exc) {
    console.log(
      'Oops, we couldn\'t get your position! Make sure you GPS is enabled ;)',
      exc,
    );
  }

  console.log('POSITION', position);

  // Show directions FROM the user's current position (if available) TO the
  // spot's location
  showLocation({
    sourceLatitude:
      (position && position.coords && position.coords.latitude) || undefined,
    sourceLongitude:
      (position && position.coords && position.coords.longitude) || undefined,
    ...latLng,
    title,
    // force GoogleMaps to use the latLng from the query instead of the title
    googleForceLatLon: true,
  });
};
