import React from 'react';
import { WebView } from 'react-native-webview';
import bundle from './WebView/bundle.json';
import { SpotFiltersContext } from '../../../Context/SpotFilters';
import { LocationContext } from '../../../Context/Location';
import { mergeCoords } from '../../../utils';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';
import { TouchableOpacity, View } from 'react-native';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import SpotListCardSmall from '../SpotListCardSmall';
import { NavigationContext } from 'react-navigation';
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const WebViewMap = () => {
  const ref = React.createRef<WebView>();

  const { locationCoords, locationEnabled } = React.useContext(LocationContext);
  const { city, maxDistance, allSports, selectedSportIds } = React.useContext(SpotFiltersContext);
  const navigation = React.useContext(NavigationContext);

  const [ currentSpotUUID, setCurrentSpotUUID ] = React.useState<string>();

  /**
   * Handles messages coming in from the WebView
   */
  const handleMessage = (e) => {
    const message = JSON.parse(e.nativeEvent.data);
    if (message.type === 'markerClick') {
      setCurrentSpotUUID(message.id);
    }
  };

  /**
   * Merges coords (based on GPS / city settings)
   */
  const getShortCoords = () => {
    const mergedCoords = mergeCoords(locationCoords, locationEnabled, city);
    return {
      lat: mergedCoords.latitude,
      lng: mergedCoords.longitude,
    };
  };

  /**
   * Variables for GET_SPOTS query
   */
  const getSpotsQueryVariables = () => {
    const coords = getShortCoords();
    return {
      sports__ids: [], // empty array will return all spots todo: hook up
      distance: `${parseInt('' + 1000 * maxDistance, 10)}:${coords.lat}:${coords.lng}`,
      offset: 0,
      limit: 500,
      ordering: 'distance',
    };
  };

  const spotsQuery = useQuery(GET_SPOTS, {
    variables: getSpotsQueryVariables(),
  });

  // When spotsQuery.data changes, clear all markers and add new ones..
  React.useEffect(() => {
    if (spotsQuery.data && spotsQuery.data.spots && ref.current) {
      ref.current.injectJavaScript(`window.mapView.clearMarkers()`);
      spotsQuery.data.spots.forEach((spot) => {
        if (ref.current) {
          ref.current.injectJavaScript(`window.mapView.addMarker(${JSON.stringify(spot.address)}, '${spot.uuid}')`);
        }
      });
    }
  }, [spotsQuery.data]);

  // pans the map to current position based on getShortCoords
  const setCurrentPosition = () => {
    if (ref.current) {
      ref.current.injectJavaScript(`window.mapView.map.panTo(${JSON.stringify(getShortCoords())})`);
    }
  };

  const requerySpots = () => {
    spotsQuery.refetch(getSpotsQueryVariables());
  };

  React.useEffect(setCurrentPosition, [locationCoords, locationEnabled, city]);
  React.useEffect(requerySpots, [locationCoords, locationEnabled, city, maxDistance]);

  const getSpotQueryVariables = () => {
    return {
      uuid: currentSpotUUID,
    };
  };

  const requerySpot = () => {
    spotQuery.refetch(getSpotQueryVariables());
  };

  const spotQuery = useQuery(GET_SPOT_DETAILS, { variables: { uuid: currentSpotUUID }});
  React.useEffect(requerySpot, [currentSpotUUID]);

  const handleCardPress = () => {
    navigation.navigate('SpotDetailsScreen', { uuid: currentSpotUUID });
  };

  return (
    <FlexOne>
      <WebView
        ref={ref}
        source={{ html: bundle }}
        onMessage={handleMessage}
        onError={console.warn}
        onLoadEnd={setCurrentPosition}
      />
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, paddingBottom: 10, justifyContent: 'flex-end', alignItems: 'center'}}>
        { spotQuery.data && spotQuery.data.spot && (
          <TouchableOpacity onPress={handleCardPress} style={{width: '100%'}}>
            <SpotListCardSmall spot={spotQuery.data.spot} />
          </TouchableOpacity>
        )}
      </View>
    </FlexOne>

  );
};


export default WebViewMap;
