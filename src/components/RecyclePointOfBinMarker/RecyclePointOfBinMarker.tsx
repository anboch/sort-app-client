import { Marker } from '@urbica/react-map-gl';
import LocalTaxiRoundedIcon from '@mui/icons-material/LocalTaxiRounded';
import WhereToVoteRoundedIcon from '@mui/icons-material/WhereToVoteRounded';
import AddLocationRoundedIcon from '@mui/icons-material/AddLocationRounded';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { IRecyclePoint } from '../../api/api.interface';
import * as S from './RecyclePointOfBinMarkerStyles';

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
  const handleMarkerClick = (e: MouseEvent<HTMLElement>): void => {
    setSelectedRecyclePoint(recyclePoint);
    if (isInSelectedRuleSet) {
      setWithOpenedInfo(e.currentTarget);
    }
  };

  return (
    <Marker
      latitude={recyclePoint?.position?.coordinates.latitude ?? null}
      longitude={recyclePoint?.position?.coordinates.longitude ?? null}
    >
      <S.Sign onClick={(e): void => handleMarkerClick(e)}>
        {!!recyclePoint.contacts?.ecoTaxi && (
          <S.TaxiIcon>
            <LocalTaxiRoundedIcon color="warning" fontSize="small" />
          </S.TaxiIcon>
        )}
        {isInSelectedRuleSet ? (
          <WhereToVoteRoundedIcon
            color="success"
            fontSize={isSelectedWithOpenedInfo ? 'large' : 'medium'}
          />
        ) : (
          <AddLocationRoundedIcon color="info" />
        )}
      </S.Sign>
    </Marker>
  );
};
