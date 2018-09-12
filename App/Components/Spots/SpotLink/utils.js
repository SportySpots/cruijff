const getSpotLocation = spot => ({
  latitude: spot && spot.address && spot.address.lat,
  longitude: spot && spot.address && spot.address.lng,
});

export default getSpotLocation;

