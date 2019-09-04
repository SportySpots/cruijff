import React from 'react';
import { WebView } from 'react-native-webview';
import bundle from './WebView/bundle.json';
import { compose } from 'react-apollo';
import { SpotFiltersContext, withSpotFilters } from '../../../Context/SpotFilters';
import { LocationContext, withLocation } from '../../../Context/Location';
import { mergeCoords } from '../../../utils';
import { useQuery } from '@apollo/react-hooks';
import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const WebViewMap = () => {
  const ref = React.createRef();
  const { locationCoords, locationEnabled } = React.useContext(LocationContext);
  const { city, maxDistance, allSports, selectedSportIds } = React.useContext(SpotFiltersContext);

  const getShortCoords = () => {
    const mergedCoords = mergeCoords(locationCoords, locationEnabled, city);
    return {
      lat: mergedCoords.latitude,
      lng: mergedCoords.longitude,
    };
  };

  const getVariables = () => {
    const coords = getShortCoords();
    return {
      sports__ids: [], // empty array will return all spots todo: hook up
      distance: `${parseInt(1000 * maxDistance, 10)}:${coords.lat}:${coords.lng}`,
      offset: 0,
      limit: 500,
      ordering: 'distance',
    };
  };

  const { loading, error, data, refetch } = useQuery(GET_SPOTS, {
    variables: getVariables(),
  });

  React.useEffect(() => {
    if (data && data.spots) {
      ref.current.injectJavaScript(`window.mapView.clearMarkers()`);
      data.spots.forEach((spot) => {
        ref.current.injectJavaScript(`window.mapView.addMarker(${JSON.stringify(spot.address)}, '${JSON.stringify(spot.uuid)}')`);
      });
    }
    console.log('data changed');
  }, [data]);

  const setPos = () => {
    // ref.current.injectJavaScript(`window.mapView.addMarker({lat: 52.370216, lng: 4.895168 }, '1')`);
    ref.current.injectJavaScript(`window.mapView.map.panTo(${JSON.stringify(getShortCoords())})`);
  };

  const requery = () => {
    console.log('refetching', getVariables());
    refetch(getVariables());
  };

  React.useEffect(setPos, [locationCoords, locationEnabled, city]);
  React.useEffect(requery, [locationCoords, locationEnabled, city, maxDistance]);

  return (
    <WebView
      ref={ref}
      source={{ html: bundle }}
      onMessage={e => console.log(e.nativeEvent)}
      // onMessage={e => console.log('message received')}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
      }}
      onLoadEnd={setPos}
    />
  );
};


export default WebViewMap;
