import React from 'react';
import { WebView } from 'react-native-webview';
import bundle from './WebView/bundle.json';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const WebViewMap = () => {
  const ref = React.createRef();

  const setPos = () => {
    ref.current.injectJavaScript(`window.mapView.addMarker({lat: 52.370216, lng: 4.895168 }, '1')`);
  };

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
