import { Marker } from '@urbica/react-map-gl';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { IRecyclePoint } from '../../api/api.interface';
import { Typography } from '@mui/material';
import * as S from './RecyclePointMarkerStyles';

interface IRecyclePointMarkerProps {
  recyclePoint: IRecyclePoint;
  numberOfUserBins: number;
  numberOfSuitableBins: number;
  setWithOpenedInfo: Dispatch<SetStateAction<HTMLElement | null>>;
  setSelectedRecyclePoint: Dispatch<SetStateAction<IRecyclePoint | null>>;
}

export const RecyclePointMarker = ({
  recyclePoint,
  numberOfUserBins,
  numberOfSuitableBins,
  setWithOpenedInfo,
  setSelectedRecyclePoint,
}: IRecyclePointMarkerProps): JSX.Element => {
  const handleMarkerClick = (e: MouseEvent<HTMLElement>): void => {
    setSelectedRecyclePoint(recyclePoint);
    setWithOpenedInfo(e.currentTarget);
  };

  return (
    <Marker
      latitude={recyclePoint?.position?.coordinates.latitude ?? null}
      longitude={recyclePoint?.position?.coordinates.longitude ?? null}
    >
      <S.Sign
        isAllAccept={numberOfSuitableBins === numberOfUserBins}
        onClick={(e): void => handleMarkerClick(e)}
      >
        <Typography>{`${numberOfSuitableBins}/${numberOfUserBins}`}</Typography>
      </S.Sign>
    </Marker>
  );
};
