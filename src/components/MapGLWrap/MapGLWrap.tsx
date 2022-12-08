import MapGL, { NavigationControl } from '@urbica/react-map-gl';
import { ReactNode, useContext, useEffect } from 'react';
import { ICoordinates } from '../../api/api.interface';
import { ThemeContext, themeModeTypes } from '../../context/ThemeContex/ThemeContext';
import { useGetUserLocation } from '../../hooks/useGetUserLocation';

export interface IViewportSettings extends ICoordinates {
  zoom: number;
}
// todo to env
export const mapCommonSettings = {
  mapboxPublicAccessToken:
    'pk.eyJ1IjoiYW5ib2NoIiwiYSI6ImNsOGFvMWVjYjBpcWkzb251NWh5bGRjeGUifQ.WPV0N6nsgi2bt6LBvUQn9w',
  defaultViewport: {
    latitude: 55.755836,
    longitude: 37.617659,
    zoom: 8,
  },
} as const;

// todo add handle error if REACT_APP_MAPBOX_ACCESS_TOKEN is undefined
export const MapGLWrap = ({
  children,
  mapHight,
  viewport,
  setViewport,
}: {
  children: ReactNode;
  mapHight: string;
  viewport: IViewportSettings;
  setViewport: React.Dispatch<React.SetStateAction<IViewportSettings>>;
}): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const { userCoordinates } = useGetUserLocation();

  useEffect(() => {
    if (userCoordinates) {
      setViewport(({ zoom }) => {
        return { zoom, ...userCoordinates };
      });
    }
  }, [userCoordinates]);

  return (
    <>
      <MapGL
        scrollZoom={false}
        pitchWithRotate={false}
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
