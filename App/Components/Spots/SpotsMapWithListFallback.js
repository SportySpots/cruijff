import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import SpotsMap from './SpotsMap';
import SpotsList from './SpotsList';

/**
 * @summary Wrapper component around SpotsMap making sure that, in case the map
 * crashes, we always display the default SpotsList.
 */
const SpotsMapWithListFallback = props => (
  <ErrorBoundary fallbackComponent={() => <SpotsList {...props} />}>
    <SpotsMap {...props} />
  </ErrorBoundary>
);

export default SpotsMapWithListFallback;
