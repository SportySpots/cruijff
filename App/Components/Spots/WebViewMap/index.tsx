import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import bundle from './WebView/bundle.json';
import { SpotFiltersContext } from 'App/Context/SpotFilters';
import { LocationContext, ICoords } from 'App/Context/Location';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import GET_SPOTS from 'App/GraphQL/Spots/Queries/GET_SPOTS';
import {TouchableOpacity, View, LayoutRectangle } from 'react-native';
import GET_SPOT_DETAILS from 'App/GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import SpotListCardSmall from '../SpotListCardSmall';
import { NavigationContext } from 'react-navigation';
import RoundButton from "App/Components/Common/RoundButton";

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

enum MessageTypes {
  MOVED='moved',
  MARKER_CLICKED='markerClick',
}

interface MovedMessage {
  type: MessageTypes.MOVED;
  center: ShortCoords;
  nw: ShortCoords;
  se: ShortCoords;
  zoom: number;
  maxDistance: number;
}
function isMovedMessage(message): message is MovedMessage {
  return message.type === MessageTypes.MOVED;
}

interface MarkerClickedMessage {
  type: MessageTypes.MARKER_CLICKED;
  id: string;
}
function isMarkerClickedMessage(message): message is MarkerClickedMessage {
  return message.type === MessageTypes.MARKER_CLICKED;
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
    if (isMarkerClickedMessage(message)) {
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

  const shortCoords = (longCoords: ICoords) => ({
    lat: longCoords.latitude,
    lng: longCoords.longitude,
  }) as ShortCoords;

  /**
   * Variables for GET_SPOTS query
   */
  const getSpotsQueryVariables = () => {
    const coords = shortCoords(locationMapCoords);
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


  const panMap = (coords: ICoords, zoom=locationMapZoom, animate=false,) => {
    if (ref.current) {
      const code = `window.mapView.map.flyTo(${JSON.stringify(shortCoords(coords))}, ${zoom}, {animate: ${animate?'true':'false'}})`;
      ref.current.injectJavaScript(injectCode(code));
    }
  }

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
        onLoadEnd={() => panMap(locationMapCoords)}
      />
      { layout && spotQuery.data && spotQuery.data.spot && (
        <View style={{position: 'absolute', height: 90, width: layout.width, left: 0, bottom: 10}}>
          <TouchableOpacity onPress={handleCardPress} style={{width: '100%'}}>
            <SpotListCardSmall spot={spotQuery.data.spot} />
          </TouchableOpacity>
        </View>
      )}
      { locationEnabled && (
        <View style={{position: 'absolute', height:30, width: 30, top:10, right: 10}}>
          <RoundButton
            iconSet="MaterialIcons"
            iconName="my-location"
            status="primary"
            disabled={false}
            onPress={() => panMap(locationGPSCoords, 12, true)}
            reverse={false}
            size="S"
          />
        </View>
      )}
    </FlexOne>

  );
};


export default WebViewMap;
