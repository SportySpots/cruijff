import React from 'react';
import ErrorBoundary from '../../Common/ErrorBoundary';
import SpotMap from '../SpotMap';
import SpotLink from '../SpotLink';

/**
 * @summary Wrapper component around SpotMap making sure that, in case the map
 * crashes, we always display a link to google maps to find the spot's location.
 */
const SpotMapWithLinkFallback = props => (
  <ErrorBoundary fallbackComponent={() => <SpotLink {...props} />}>
    <SpotMap {...props} />
  </ErrorBoundary>
);

export default SpotMapWithLinkFallback;
