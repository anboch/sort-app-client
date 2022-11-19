import { RecyclePointOfBinMarker } from '../RecyclePointOfBinMarker/RecyclePointOfBinMarker';
import { Map } from '../Map/Map';
import { getIDs } from '../../utils/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { IRecyclePoint, IRuleSet } from '../../api/api.interface';
import { RecyclePointInfo } from '../MyRecyclePoints/MyRecyclePoints';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { PopperContainer } from '../PopperContainer/PopperContainer';

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
        <PopperContainer
          withOpenedInfo={withOpenedInfo}
          selectedRecyclePoint={selectedRecyclePoint}
          setWithOpenedInfo={setWithOpenedInfo}
        >
          <RecyclePointInfo recyclePoint={selectedRecyclePoint} />
        </PopperContainer>
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
