import { Typography, IconButton, Collapse } from '@mui/material';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import MapIcon from '@mui/icons-material/Map';

import * as S from './RecyclePointsOfBinStyle';
import { IRuleSet, IRecyclePoint } from '../../api/api.interface';
import { RecyclePointsOnMap } from '../RecyclePointsOnMap/RecyclePointsOnMap';

interface IBinRecyclePointsProps {
  isEditMode: boolean;
  ruleSetOfBin: IRuleSet | null;
  selectedRecyclePoint: IRecyclePoint | null;
  allRecyclePoints: IRecyclePoint[];
  selectedRuleSet: IRuleSet | null;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  setSelectedRecyclePoint: Dispatch<SetStateAction<IRecyclePoint | null>>;
}

export const RecyclePointsOfBin = ({
  isEditMode,
  ruleSetOfBin,
  selectedRecyclePoint,
  allRecyclePoints,
  selectedRuleSet,
  setIsEditMode,
  setSelectedRecyclePoint,
}: IBinRecyclePointsProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [downloadMap, setDownloadMap] = useState<boolean>(false);
  const infoAboutSelectedAndAllRecyclePoints =
    ruleSetOfBin?.recyclePointIDs.length === allRecyclePoints.length
      ? allRecyclePoints.length
      : `${
          isEditMode
            ? selectedRuleSet?.recyclePointIDs.length
            : ruleSetOfBin?.recyclePointIDs.length
        } из ${allRecyclePoints.length}`;

  const handleChange = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    setIsExpanded(isEditMode);
  }, [isEditMode]);

  useEffect(() => {
    if (isExpanded) {
      setDownloadMap(true);
    } else if (isEditMode) {
      setIsEditMode(false);
    }
  }, [isExpanded]);

  return (
    <div>
      <Typography variant="caption">пункты приёма</Typography>
      <S.RecyclePointsOfBinSummary>
        {ruleSetOfBin && allRecyclePoints && (
          <Typography>
            По выбранным правилам{' '}
            <Typography component="span" style={{ whiteSpace: 'nowrap' }}>
              {`принимают: ${infoAboutSelectedAndAllRecyclePoints}`}
            </Typography>
          </Typography>
        )}
        <IconButton onClick={handleChange}>
          <MapIcon />
        </IconButton>
      </S.RecyclePointsOfBinSummary>
      <Collapse in={isExpanded} timeout="auto">
        {downloadMap && (
          <S.RecyclePointsOfBinOnMap>
            <RecyclePointsOnMap
              selectedRecyclePoint={selectedRecyclePoint}
              isEditMode={isEditMode}
              allRecyclePoints={allRecyclePoints}
              selectedRuleSet={selectedRuleSet}
              setSelectedRecyclePoint={setSelectedRecyclePoint}
            />
          </S.RecyclePointsOfBinOnMap>
        )}
      </Collapse>
    </div>
  );
};
