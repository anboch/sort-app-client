import { Button, DialogActions, DialogTitle, TextField, useTheme } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import * as S from './BinCreationStyles';
import { IType, IUser } from '../../api/api.interface';
import { useCreateBin } from '../../hooks/useCreateBin';
import { BinRules } from '../Bin/Bin';
import { useChangeSelectedRecyclePoint } from '../../hooks/useChangeSelectedRecyclePoint';
import { LoginFormContext } from '../../context/LoginFormContext';
import { UseQueryResult } from '@tanstack/react-query';
import { RecyclePointsOfBinOnMap } from '../RecyclePointsOfBinOnMap/RecyclePointsOfBinOnMap';

interface IBinCreationProps {
  materialTypes: (IType | undefined)[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userQ: UseQueryResult<IUser, unknown>;
}

export const BinCreation = ({
  materialTypes,
  setIsOpen,
  userQ,
}: IBinCreationProps): JSX.Element => {
  const theme = useTheme();
  const [titleValue, setTitleValue] = useState<string>(`№ ${userQ.data?.binCounter ?? 1}`);
  const { setIsOpen: setIsLoginFormOpen } = useContext(LoginFormContext);
  const createBinM = useCreateBin();
  const {
    selectedRecyclePoint,
    allRuleSets,
    allRecyclePoints,
    selectedType,
    selectedRuleSet,
    setSelectedRecyclePoint,
  } = useChangeSelectedRecyclePoint(materialTypes);

  const saveBin = () => {
    if (!userQ.data) {
      setIsLoginFormOpen(true);
    } else if (selectedType && selectedRuleSet) {
      createBinM.mutate({
        title: titleValue,
        typeID: selectedType._id,
        ruleSetID: selectedRuleSet._id,
      });
    }
  };

  useEffect(() => {
    if (createBinM.isSuccess) {
      setIsOpen(false);
    }
  }, [createBinM.isSuccess]);

  useEffect(() => {
    if (allRuleSets.length > 0 && allRecyclePoints.length > 0) {
      allRuleSets.forEach((ruleSet) => {
        if (
          ruleSet.recyclePointIDs.length === allRecyclePoints.length &&
          typeof ruleSet.recyclePointIDs[0] === 'object'
        ) {
          setSelectedRecyclePoint(ruleSet.recyclePointIDs[0]);
        }
      });
    }
  }, [allRuleSets, allRecyclePoints]);

  // todo add hint to Save button when it's disabled
  return (
    <>
      <DialogTitle>Создание корзины</DialogTitle>
      <S.BinCreationContent>
        <TextField
          sx={{ marginTop: theme.spacing(1) }}
          value={titleValue}
          onChange={(e): void => setTitleValue(e.target.value)}
          id="filled-basic"
          label="Название корзины"
          variant="outlined"
          size="small"
        />
        {/* <BinType typeID={bin.typeID} /> */}
        <BinRules isEditMode={true} selectedRuleSet={selectedRuleSet} allRuleSets={allRuleSets} />
      </S.BinCreationContent>
      <RecyclePointsOfBinOnMap
        selectedRecyclePoint={selectedRecyclePoint}
        allRecyclePoints={allRecyclePoints}
        selectedRuleSet={selectedRuleSet}
        setSelectedRecyclePoint={setSelectedRecyclePoint}
      />
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Отмена</Button>
        <Button disabled={!selectedType && !selectedRuleSet} onClick={saveBin}>
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
};
