import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './test.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const position: LatLngExpression = [51.505, -0.09];
const WebViewMap = (
  <Map center={position} zoom={13}>
    <TileLayer
      url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
      // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>
  </Map>
)
console.log(document.getElementById('react-root'));
ReactDOM.render(WebViewMap, document.getElementById('react-root'));
