import { RecyclePointOfBinMarker } from '../RecyclePointOfBinMarker/RecyclePointOfBinMarker';
import { Map } from '../Map/Map';
import { getIDs } from '../../utils/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IRecyclePoint, IRuleSet } from '../../api/api.interface';
import { Popper, IconButton } from '@mui/material';
import { RecyclePointInfo } from '../MyRecyclePoints/MyRecyclePoints';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import * as S from './RecyclePointsOfBinOnMapStyles';

interface IBinRecyclePointsOnMapProps {
  isEditMode?: boolean;
  selectedRecyclePoint: IRecyclePoint | null;
  allRecyclePoints: IRecyclePoint[];
  selectedRuleSet: IRuleSet | null;
  setSelectedRecyclePoint: Dispatch<SetStateAction<IRecyclePoint | null>>;
}

export const RecyclePointsOfBinOnMap = ({
  isEditMode = true,
  selectedRecyclePoint,
  allRecyclePoints,
  selectedRuleSet,
  setSelectedRecyclePoint,
}: IBinRecyclePointsOnMapProps): JSX.Element => {
  const [withOpenedInfo, setWithOpenedInfo] = useState<HTMLElement | null>(null);
  const refOutsideClick = useOutsideClick(() => setWithOpenedInfo(null));
  const isInSelectedRuleSet = (recyclePointId: string): boolean =>
    getIDs(selectedRuleSet?.recyclePointIDs ?? []).includes(recyclePointId);

  return (
    <>
      <Map>
        <Popper
          disablePortal
          anchorEl={withOpenedInfo}
          ref={refOutsideClick}
          open={!!withOpenedInfo && !!selectedRecyclePoint}
        >
          <S.Info>
            <RecyclePointInfo recyclePoint={selectedRecyclePoint} />
            <div style={{ marginLeft: 'auto' }}>
              <IconButton size="small" sx={{ padding: 0 }} onClick={() => setWithOpenedInfo(null)}>
                <CloseIcon />
              </IconButton>
            </div>
          </S.Info>
        </Popper>
        {allRecyclePoints.map((recyclePoint) => {
          if (isEditMode || isInSelectedRuleSet(recyclePoint._id)) {
            return (
              <RecyclePointOfBinMarker
                key={recyclePoint._id}
                recyclePoint={recyclePoint}
                isSelectedWithOpenedInfo={
                  selectedRecyclePoint?._id === recyclePoint._id && !!withOpenedInfo
                }
                isInSelectedRuleSet={isInSelectedRuleSet(recyclePoint._id)}
                setWithOpenedInfo={setWithOpenedInfo}
                setSelectedRecyclePoint={setSelectedRecyclePoint}
              />
            );
          }
        })}
      </Map>
    </>
  );
};
