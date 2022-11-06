import MapGL, { NavigationControl } from '@urbica/react-map-gl';
import { ReactNode, useState } from 'react';

interface IViewportSettings {
  latitude: number;
  longitude: number;
  zoom: number;
}
// todo to env
const mapCommonSettings = {
  mapboxPublicAccessToken:
    'pk.eyJ1IjoiYW5ib2NoIiwiYSI6ImNsOGFvMWVjYjBpcWkzb251NWh5bGRjeGUifQ.WPV0N6nsgi2bt6LBvUQn9w',
  // todo think about default coord and zoom
  defaultViewport: {
    latitude: 55.755836,
    longitude: 37.617659,
    zoom: 9,
  },
} as const;

export const Map = ({ children }: { children: ReactNode }): JSX.Element => {
  const [viewport, setViewport] = useState<IViewportSettings>(mapCommonSettings.defaultViewport);

  return (
    <>
      <MapGL
        scrollZoom={false}
        style={{ width: '100%', height: '400px' }}
        mapStyle="mapbox://styles/anboch/cla096w1a00ab15s2lllm4o89"
        accessToken={mapCommonSettings.mapboxPublicAccessToken}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        onViewportChange={setViewport}
      >
        {children}
        <NavigationControl showCompass={false} position="top-right" />
      </MapGL>
    </>
  );
};
