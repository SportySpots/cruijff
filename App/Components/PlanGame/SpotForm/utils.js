import { uniqBy } from 'ramda';

const curatedSpots = spots => (
  spots && spots.length > 0
    ? uniqBy(({ uuid }) => (uuid), spots)
    : []
);

export default curatedSpots;
