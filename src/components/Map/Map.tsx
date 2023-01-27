import { ReactNode, useEffect, useState } from 'react';
import { IViewportSettings, mapCommonSettings, MapGLWrap } from '../MapGLWrap/MapGLWrap';

// todo add handle error if REACT_APP_MAPBOX_ACCESS_TOKEN is undefined
export const Map = ({
  children,
  mapHight,
  zoom,
}: {
  children: ReactNode;
  mapHight: string;
  zoom?: number;
}): JSX.Element => {
  const [viewport, setViewport] = useState<IViewportSettings>(mapCommonSettings.defaultViewport);

  useEffect(() => {
    if (zoom) {
      setViewport({ ...mapCommonSettings.defaultViewport, zoom });
    }
  }, [zoom]);

  return (
    <>
      <MapGLWrap mapHight={mapHight} viewport={viewport} setViewport={setViewport}>
        {children}
      </MapGLWrap>
    </>
  );
};
