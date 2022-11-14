import { Marker } from '@urbica/react-map-gl';
import WhereToVoteRoundedIcon from '@mui/icons-material/WhereToVoteRounded';
import AddLocationRoundedIcon from '@mui/icons-material/AddLocationRounded';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { IRecyclePoint } from '../../api/api.interface';

interface IRecyclePointMarkerProps {
  recyclePoint: IRecyclePoint;
  isInSelectedRuleSet: boolean;
  isSelectedWithOpenedInfo: boolean;
  setWithOpenedInfo: Dispatch<SetStateAction<HTMLElement | null>>;
  setSelectedRecyclePoint: Dispatch<SetStateAction<IRecyclePoint | null>>;
}

export const RecyclePointOfBinMarker = ({
  recyclePoint,
  isSelectedWithOpenedInfo,
  isInSelectedRuleSet,
  setWithOpenedInfo,
  setSelectedRecyclePoint,
}: IRecyclePointMarkerProps): JSX.Element => {
  const handleMarkerClick = (e: MouseEvent<HTMLElement>, recyclePoint: IRecyclePoint) => {
    setSelectedRecyclePoint(recyclePoint);
    setWithOpenedInfo(e.currentTarget);
  };

  return (
    <Marker
      key={recyclePoint._id}
      latitude={recyclePoint?.position?.coordinates.latitude ?? null}
      longitude={recyclePoint?.position?.coordinates.longitude ?? null}
    >
      <div style={{ cursor: 'pointer' }} onClick={(e) => handleMarkerClick(e, recyclePoint)}>
        {isInSelectedRuleSet ? (
          <WhereToVoteRoundedIcon
            color="success"
            fontSize={isSelectedWithOpenedInfo ? 'large' : 'medium'}
          />
        ) : (
          <AddLocationRoundedIcon color="info" />
        )}
      </div>
    </Marker>
  );
};
