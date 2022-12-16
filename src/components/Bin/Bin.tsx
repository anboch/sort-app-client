import { useMemo, useState } from 'react';
import { Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import * as S from './BinStyles';
import { useUpdateBin } from '../../hooks/useUpdateBin';
import { useGetType } from '../../hooks/useGetType';
import { useGetRuleSet } from '../../hooks/useGetRuleSet';
import { useChangeSelectedRecyclePoint } from '../../hooks/useChangeSelectedRecyclePoint';
import { IBin } from '../../api/api.interface';
import { getId } from '../../utils/utils';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { BinTitle } from '../BinTitle/BinTitle';
import { BinType } from '../BinType/BinType';
import { BinRules } from '../BinRules/BinRules';
import { RecyclePointsOfBin } from '../RecyclePointsOfBin/RecyclePointsOfBin';
import { BinActions } from '../BinActions/BinActions';

export const Bin = ({ bin }: { bin: IBin }): JSX.Element => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const ruleSetQ = useGetRuleSet(getId(bin.ruleSetID));
  const typeQ = useGetType(getId(bin.typeID));
  const binM = useUpdateBin();

  const {
    allRuleSets,
    allRecyclePoints,
    selectedRuleSet,
    selectedRecyclePoint,
    setSelectedRecyclePoint,
  } = useChangeSelectedRecyclePoint(useMemo(() => [typeQ.data], [typeQ.data]));

  const saveUpdatedBin = () => {
    if (selectedRuleSet?._id !== getId(bin.ruleSetID)) {
      binM.mutate(
        { _id: bin._id, ruleSetID: selectedRuleSet?._id },
        {
          onSuccess() {
            // todo add loading and Success sign
            setIsEditMode(false);
          },
        }
      );
    } else {
      setIsEditMode(false);
    }
    // todo handle selectedRuleSet === null
  };

  const setRecyclePointFromRuleSetOfBinAsSelected = () =>
    setSelectedRecyclePoint(
      typeof ruleSetQ.data?.recyclePointIDs[0] === 'object'
        ? ruleSetQ.data.recyclePointIDs[0]
        : null
    );

  const handleEditClick = () => {
    setRecyclePointFromRuleSetOfBinAsSelected();
    setIsEditMode(true);
  };

  return (
    <S.Bin>
      <S.BinPropertyContainer>
        <BinTitle _id={bin._id} title={bin.title} />
      </S.BinPropertyContainer>
      <S.BinPropertyContainer>
        <BinType typeID={bin.typeID} />
      </S.BinPropertyContainer>
      {ruleSetQ.isLoading && ruleSetQ.isFetching ? (
        <LoadingSpinner />
      ) : (
        <S.BinPropertyContainer>
          <S.RulesAndEditRuleSet>
            <BinRules
              isEditMode={isEditMode}
              // todo create constant
              selectedRuleSet={isEditMode ? selectedRuleSet : ruleSetQ.data ?? null}
              allRuleSets={allRuleSets}
            />
            <S.EditRuleSetOfBin>
              {!isEditMode ? (
                allRuleSets &&
                allRuleSets?.length > 1 && (
                  <div>
                    <IconButton onClick={handleEditClick}>
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                )
              ) : (
                <>
                  <div>
                    <IconButton onClick={() => setIsEditMode(false)}>
                      <CancelIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                  <div
                    style={{
                      visibility:
                        selectedRuleSet?._id === getId(bin.ruleSetID) ? 'hidden' : 'visible',
                    }}
                  >
                    <IconButton onClick={saveUpdatedBin}>
                      <SaveIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </>
              )}
            </S.EditRuleSetOfBin>
          </S.RulesAndEditRuleSet>
          <Divider variant="middle" />
          <RecyclePointsOfBin
            isEditMode={isEditMode}
            ruleSetOfBin={ruleSetQ.data ?? null}
            selectedRecyclePoint={selectedRecyclePoint}
            // todo create constant
            selectedRuleSet={isEditMode ? selectedRuleSet : ruleSetQ.data ?? null}
            allRecyclePoints={allRecyclePoints}
            setIsEditMode={setIsEditMode}
            setSelectedRecyclePoint={setSelectedRecyclePoint}
          />
        </S.BinPropertyContainer>
      )}
      <BinActions bin={bin} />
    </S.Bin>
  );
};
