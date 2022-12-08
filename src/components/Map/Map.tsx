import { ReactNode, useState } from 'react';
import { IViewportSettings, mapCommonSettings, MapGLWrap } from '../MapGLWrap/MapGLWrap';

// todo add handle error if REACT_APP_MAPBOX_ACCESS_TOKEN is undefined
export const Map = ({
  children,
  mapHight,
}: {
  children: ReactNode;
  mapHight: string;
}): JSX.Element => {
  const [viewport, setViewport] = useState<IViewportSettings>(mapCommonSettings.defaultViewport);

  return (
    <>
      <MapGLWrap mapHight={mapHight} viewport={viewport} setViewport={setViewport}>
        {children}
      </MapGLWrap>
    </>
  );
};
