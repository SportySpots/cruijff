import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import bundle from './WebView/bundle.json';
import { SpotFiltersContext } from 'App/Context/SpotFilters';
import { LocationContext } from 'App/Context/Location';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import GET_SPOTS from 'App/GraphQL/Spots/Queries/GET_SPOTS';
import {TouchableOpacity, View, LayoutRectangle } from 'react-native';
import GET_SPOT_DETAILS from 'App/GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import SpotListCardSmall from '../SpotListCardSmall';
import { NavigationContext } from 'react-navigation';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;

interface ShortCoords {
  lat: number;
  lng: number;
}

interface Message {
  type: string;
}

function isMovedMessage(message: Message): message is MovedMessage {
  return message.type === 'moved';
}

interface MovedMessage extends Message {
  type: 'moved';
  center: ShortCoords;
  nw: ShortCoords;
  se: ShortCoords;
  zoom: number;
  maxDistance: number;
}

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const WebViewMap = () => {
  const ref = React.createRef<WebView>();
  const [layout, setLayout] = useState<LayoutRectangle>();

  const {
    locationMapCoords,
    locationSetMapCoords,
    locationGPSCoords,
    locationEnabled,
    locationMapZoom,
    locationSetMapZoom,
  } = React.useContext(LocationContext);

  const { maxDistance, allSports, selectedSportIds, setMaxDistance } = React.useContext(SpotFiltersContext);
  const navigation = React.useContext(NavigationContext);

  const [ currentSpotUUID, setCurrentSpotUUID ] = React.useState<string>();

  /**
   * Handles messages coming in from the WebView
   */
  const handleMessage = (e) => {
    const message = JSON.parse(e.nativeEvent.data);
    console.log(message);
    if (message.type === 'markerClick') {
      setCurrentSpotUUID(message.id);
    } else if (isMovedMessage(message) && message.maxDistance) {
      locationSetMapCoords({
        latitude: message.center.lat,
        longitude: message.center.lng,
      });
      locationSetMapZoom(message.zoom);
      const distanceInKM = Math.round(message.maxDistance / 100) / 10; // rounded to 1 decimal
      setMaxDistance({maxDistance: distanceInKM });
    }
  };

  const getShortCoords: () => ShortCoords = () => {
    return {
      lat: locationMapCoords.latitude,
      lng: locationMapCoords.longitude,
    };
  };

  /**
   * Variables for GET_SPOTS query
   */
  const getSpotsQueryVariables = () => {
    const coords = getShortCoords();
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      sports__ids: selectedSportIds, // empty array will return all spots
      distance: `${parseInt('' + 1000 * maxDistance, 10)}:${coords.lat}:${coords.lng}`,
      offset: 0,
      limit: 500,
      ordering: 'distance',
    };
  };

  const spotsQuery = useQuery(GET_SPOTS, {
    variables: getSpotsQueryVariables(),
  });

  const injectCode = (code) => {
    // NOTE: Fix for bug in IOS
    // REF: https://github.com/react-native-community/react-native-webview/issues/341#issuecomment-466639820
    return `
      setTimeout(() => {
        ${code}
      }, 0);
    `;
  };

  // When spotsQuery.data changes, clear all markers and add new ones..
  React.useEffect(() => {
    if (spotsQuery.data && spotsQuery.data.spots && ref.current) {
      const spots = spotsQuery.data.spots;
      const injectParam = JSON.stringify(spots.map(({ address, uuid }) => ({ coords: address, uuid })));
      ref.current.injectJavaScript(injectCode(`window.mapView.setMarkers(${injectParam})`));
    }
  }, [spotsQuery.data]);

  // pans the map to current position based on getShortCoords
  const setCurrentPosition = () => {
    if (ref.current) {
      const panToCode = injectCode(`window.mapView.map.flyTo(${JSON.stringify(getShortCoords())},${locationMapZoom}, {animate: false})`);
      ref.current.injectJavaScript(panToCode);
    }
  };

  const requerySpots = () => {
    spotsQuery.refetch(getSpotsQueryVariables());
  };

  // React.useEffect(setCurrentPosition, [locationCoords, locationEnabled]);
  React.useEffect(requerySpots, [locationEnabled, maxDistance]);

  const getSpotQueryVariables = () => {
    return {
      uuid: currentSpotUUID,
    };
  };

  const spotQuery = useQuery(GET_SPOT_DETAILS, { variables: { uuid: currentSpotUUID }});
  const requerySpot = () => {
    spotQuery.refetch(getSpotQueryVariables());
  };

  React.useEffect(requerySpot, [currentSpotUUID]);

  const handleCardPress = () => {
    navigation.navigate('SpotDetailsScreen', { uuid: currentSpotUUID });
  };

  return (
    <FlexOne>
      <WebView
        onLayout={e => setLayout(e.nativeEvent.layout)}
        ref={ref}
        source={{ html: bundle }}
        onMessage={handleMessage}
        onError={console.warn}
        onLoadEnd={setCurrentPosition}
      />
      { layout && spotQuery.data && spotQuery.data.spot && (
        <View style={{position: 'absolute', height: 90, width: layout.width, left: 0, bottom: 0, paddingBottom: 10, justifyContent: 'flex-end', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleCardPress} style={{width: '100%'}}>
            <SpotListCardSmall spot={spotQuery.data.spot} />
          </TouchableOpacity>
        </View>
      )}

    </FlexOne>

  );
};


export default WebViewMap;
