import { RecyclePointOfBinMarker } from '../RecyclePointOfBinMarker/RecyclePointOfBinMarker';
import { Map } from '../Map/Map';
import { getIDs } from '../../utils/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { IRecyclePoint, IRuleSet } from '../../api/api.interface';
import { RecyclePointInfo } from '../MyRecyclePoints/MyRecyclePoints';
import { PopperContainer } from '../PopperContainer/PopperContainer';

interface IBinRecyclePointsOnMapProps {
  isEditMode?: boolean | undefined;
  selectedRecyclePoint: IRecyclePoint | null;
  allRecyclePoints: IRecyclePoint[];
  selectedRuleSet: IRuleSet | null;
  setSelectedRecyclePoint: Dispatch<SetStateAction<IRecyclePoint | null>>;
  isRecyclePointFarAway: boolean;
}

export const RecyclePointsOnMap = ({
  isEditMode = true,
  selectedRecyclePoint,
  allRecyclePoints,
  selectedRuleSet,
  setSelectedRecyclePoint,
  isRecyclePointFarAway,
}: IBinRecyclePointsOnMapProps): JSX.Element => {
  const [withOpenedInfo, setWithOpenedInfo] = useState<HTMLElement | null>(null);
  const isInSelectedRuleSet = (recyclePointId: string): boolean =>
    getIDs(selectedRuleSet?.recyclePointIDs ?? []).includes(recyclePointId);

  return (
    <>
      <Map mapHight={'60vh'} zoom={isRecyclePointFarAway ? 2 : undefined}>
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
