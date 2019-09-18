import React from 'react';
import { WebView } from 'react-native-webview';
import bundle from './WebView/bundle.json';
import { SpotFiltersContext } from '../../../Context/SpotFilters';
import { LocationContext } from '../../../Context/Location';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';
import {Animated, TouchableOpacity, View} from 'react-native';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import SpotListCardSmall from '../SpotListCardSmall';
import { NavigationContext } from 'react-navigation';
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;

interface IShortCoords {
  lat: number;
  lng: number;
}

interface IMessage {
  type: string;
}

function isMovedMessage(message: IMessage): message is IMovedMessage {
  return message.type === 'moved';
}

interface IMovedMessage extends IMessage {
  type: 'moved';
  center: IShortCoords;
  nw: IShortCoords;
  se: IShortCoords;
  zoom: number;
  maxDistance: number;
}

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const WebViewMap = () => {
  const ref = React.createRef<WebView>();

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

  // const curre

  /**
   * Handles messages coming in from the WebView
   */
  const handleMessage = (e) => {
    const message = JSON.parse(e.nativeEvent.data);
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

  const getShortCoords: () => IShortCoords = () => {
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
      }, 100);
    `;
  };

  // When spotsQuery.data changes, clear all markers and add new ones..
  React.useEffect(() => {
    if (spotsQuery.data && spotsQuery.data.spots && ref.current) {
      let clearMarkerCode = injectCode('window.mapView.clearMarkers();');
      ref.current.injectJavaScript(clearMarkerCode);
      let markers: Array<{lat: number, lng: number, id: string}> = [];
      spotsQuery.data.spots.forEach((spot) => {
        markers.push({
          lat: spot.address.lat,
          lng: spot.address.lng,
          id: spot.uuid
        })
      });
      if (ref.current) {
        let addMarkerCode = injectCode(`window.mapView.addMarkers(${JSON.stringify(markers)});`);
        ref.current.injectJavaScript(addMarkerCode);
      }
    }
  }, [spotsQuery.data]);

  // pans the map to current position based on getShortCoords
  const setCurrentPosition = () => {
    if (ref.current) {
      let panToCode = injectCode(`window.mapView.map.flyTo(${JSON.stringify(getShortCoords())},${locationMapZoom}, {animate: false})`);
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
