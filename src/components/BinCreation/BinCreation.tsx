import { Button, DialogActions, DialogTitle, Divider, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';

import * as S from './BinCreationStyles';
import { IType, IUser } from '../../api/api.interface';
import { useState } from 'react';
import { useCreateBin } from '../../hooks/useCreateBin';
import { BinRecyclePoints, BinRules } from '../Bin/Bin';
import { useChangeSelectedRecyclePoint } from '../../hooks/useChangeSelectedRecyclePoint';
import { LoginFormContext } from '../../context/LoginFormContext';
import { UseQueryResult } from '@tanstack/react-query';

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
  const [titleValue, setTitleValue] = useState<string>(`№ ${userQ.data?.binCounter ?? 1}`);
  const { setIsOpen: setIsLoginFormOpen } = useContext(LoginFormContext);
  const createBinM = useCreateBin();
  const { allRuleSets, allRecyclePoints, selectedType, selectedRuleSet, setSelectedRecyclePoint } =
    useChangeSelectedRecyclePoint(materialTypes);

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
    <S.BinCreation>
      <DialogTitle>Create a bin</DialogTitle>
      <TextField
        value={titleValue}
        onChange={(e): void => setTitleValue(e.target.value)}
        id="filled-basic"
        label="Bin title"
        variant="filled"
        size="small"
      />
      {/* <BinType typeID={bin.typeID} /> */}
      <Divider variant="middle" />
      <BinRules isEditMode={true} selectedRuleSet={selectedRuleSet} allRuleSets={allRuleSets} />
      <BinRecyclePoints
        isCreateMode
        allRecyclePoints={allRecyclePoints}
        selectedRuleSet={selectedRuleSet}
        setSelectedRecyclePoint={setSelectedRecyclePoint}
      />
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button disabled={!selectedType && !selectedRuleSet} onClick={saveBin}>
          Save
        </Button>
      </DialogActions>
    </S.BinCreation>
  );
};
