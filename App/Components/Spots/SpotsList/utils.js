import { uniqBy } from 'ramda';

/**
 * @summary Make sure spots are unique.
 */
export const curatedSpots = spots => (
  spots && spots.length > 0
    ? uniqBy(({ uuid }) => (uuid), spots)
    : []
);

export const getSpotLocation = spot => ({
  latitude: spot && spot.address && spot.address.lat,
  longitude: spot && spot.address && spot.address.lng,
});

export const rounded = number => (Math.round(number * 10) / 10);
