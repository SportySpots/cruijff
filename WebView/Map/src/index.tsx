import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './test.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLngExpression, Icon, Point } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const position: LatLngExpression = [51.505, -0.09];

const icon = new Icon({
  // iconUrl: 'https://image.flaticon.com/icons/png/512/37/37134.png',
  iconUrl: 'https://rawcdn.githack.com/google/material-design-icons/224895a86501195e7a7ff3dde18e39f00b8e3d5a/communication/svg/production/ic_location_on_48px.svg',
  iconSize: new Point(50,50),
});

const WebViewMap = (
  <Map center={position} zoom={13}>
    <TileLayer
      url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
      // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker
      position={position}
      icon={icon}
    >
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>
  </Map>
)
console.log(document.getElementById('react-root'));
ReactDOM.render(WebViewMap, document.getElementById('react-root'));
