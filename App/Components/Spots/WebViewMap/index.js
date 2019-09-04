import React from 'react';
import { WebView } from 'react-native-webview';
import bundle from './WebView/bundle.json';
import { compose } from 'react-apollo';
import { withSpotFilters } from '../../../Context/SpotFilters';
import { withLocation } from '../../../Context/Location';
import { mergeCoords } from '../../../utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const WebViewMap = ({ locationCoords, locationEnabled, city }) => {
  const ref = React.createRef();

  const setPos = () => {
    const mergedCoords = mergeCoords(locationCoords, locationEnabled, city);
    const shortCoords = {
      lat: mergedCoords.latitude,
      lng: mergedCoords.longitude,
    };
    // ref.current.injectJavaScript(`window.mapView.addMarker({lat: 52.370216, lng: 4.895168 }, '1')`);
    ref.current.injectJavaScript(`window.mapView.map.panTo(${JSON.stringify(shortCoords)})`);
  };

  React.useEffect(setPos, [locationCoords, locationEnabled, city]);

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

const enhance = compose(
  withSpotFilters,
  withLocation,
);

export default enhance(WebViewMap);
