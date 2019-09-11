import './test.css';
import {
  LatLngExpression,
  Icon,
  Point,
  Map,
  TileLayer,
  FeatureGroup,
  Layer,
  Marker,
  LayerGroup
} from 'leaflet';
import 'leaflet/dist/leaflet.css';

type PostMessage = (message: any) => void;

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage?: PostMessage;
    };
    mapView: MapView;
  }
}

const postMessage = (message: any) => {
  if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  } else {
    (window as any).postMessage(JSON.stringify(message));
  }
}

const defaultIcon = new Icon({
  // iconUrl: 'https://image.flaticon.com/icons/png/512/37/37134.png',
  iconUrl: 'https://rawcdn.githack.com/google/material-design-icons/224895a86501195e7a7ff3dde18e39f00b8e3d5a/communication/svg/production/ic_location_on_48px.svg',
  iconSize: new Point(50,50),
});

const selectedIcon = new Icon({
  iconUrl: 'https://image.flaticon.com/icons/png/512/37/37134.png',
  // iconUrl: 'https://rawcdn.githack.com/google/material-design-icons/224895a86501195e7a7ff3dde18e39f00b8e3d5a/communication/svg/production/ic_location_on_48px.svg',
  iconSize: new Point(50,50),
});

const tilemapURL = "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"

interface ICoords {
  lat: number,
  lng: number,
}

class IDMarker extends Marker {
  id: string;
  constructor(coords: ICoords, id: string) {
    const options = {
      icon: defaultIcon,
    }
    super([coords.lat, coords.lng], options);
    this.id = id;
  }
}

const markers: IDMarker[] = [];

class MapView {
  map: Map;
  tileLayer: TileLayer;
  markersLayerGroup: LayerGroup;

  addMarker(coords: ICoords, id: string) {
    const newMarker = new IDMarker(coords, id);
    newMarker.on('click', (e) => {
      const target: IDMarker = e.target;
      try {
        this.markersLayerGroup.eachLayer((marker: any) => marker.setIcon(defaultIcon));
        target.setIcon(selectedIcon);
        this.map.panTo(target.getLatLng());
        postMessage({type: 'markerClick', id: e.target.id});
      } catch(e) {
        console.log(e);
      }
    });
    newMarker.addTo(this.markersLayerGroup);
    markers.push(newMarker);
  }

  clearMarkers() {
    while (markers.length > 0) { markers.pop(); }
    this.markersLayerGroup.clearLayers();
  }

  constructor() {
    this.map = new Map('leaflet-root', {
      minZoom: 10,
      maxZoom: 18,
    }).setView([52.370216, 4.895168], 13)
      .on('moveend', e => {
        const coords = this.map.getCenter();
        postMessage({type: 'moved', ...coords, zoom: this.map.getZoom()});
      });
    this.tileLayer = new TileLayer(tilemapURL, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18,
    })
      .addTo(this.map);
    this.markersLayerGroup = new FeatureGroup().addTo(this.map);
  }
}

window.mapView = new MapView();
