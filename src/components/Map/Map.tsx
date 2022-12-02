import MapGL, { NavigationControl } from '@urbica/react-map-gl';
import { ReactNode, useContext, useState } from 'react';
import { ThemeContext, themeModeTypes } from '../../context/ThemeContex/ThemeContext';

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

// todo add handle error if REACT_APP_MAPBOX_ACCESS_TOKEN is undefined
export const Map = ({
  children,
  mapHight,
}: {
  children: ReactNode;
  mapHight: string;
}): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const [viewport, setViewport] = useState<IViewportSettings>(mapCommonSettings.defaultViewport);

  return (
    <>
      <MapGL
        scrollZoom={false}
        style={{ width: '100%', height: mapHight }}
        mapStyle={
          theme === themeModeTypes.LIGHT
            ? 'mapbox://styles/anboch/cla096w1a00ab15s2lllm4o89'
            : 'mapbox://styles/anboch/clamp54r4000714l86046tm8o'
        }
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
