import { Button, DialogActions, DialogTitle, Divider, TextField } from '@mui/material';
import { useEffect } from 'react';

import * as S from './BinCreationStyles';
import { IType } from '../../api/api.interface';
import { useState } from 'react'; import { useCreateBin } from '../../hooks/useCreateBin';
import { BinRecyclePoints, BinRules } from '../Bin/Bin';
import { useChangeSelectedRecyclePoint } from '../../hooks/useChangeSelectedRecyclePoint';


export const BinCreation = ({ materialTypes, handleCloseDialog }: { materialTypes: (IType | undefined)[], handleCloseDialog: () => void }): JSX.Element => {
  const [titleValue, setTitleValue] = useState<string>('');
  const createBinM = useCreateBin();
  const {
    allRuleSets,
    allRecyclePoints,
    selectedType,
    selectedRuleSet,
    setSelectedRecyclePoint,
  } = useChangeSelectedRecyclePoint(materialTypes);

  const saveBin = () => {
    if (selectedType && selectedRuleSet) {
      createBinM.mutate(({ title: titleValue, typeID: selectedType._id, ruleSetID: selectedRuleSet._id }))
    }
  }

  useEffect(() => {
    if (createBinM.isSuccess) {
      handleCloseDialog()
    }
  }, [createBinM.isSuccess])


  return (
    <S.BinCreation>
      <DialogTitle>Create a bin</DialogTitle>
      <TextField
        value={titleValue}
        onChange={(e): void => setTitleValue(e.target.value)}
        id="filled-basic"
        label="Bin title"
        variant="filled"
        size="small" />
      {/* <BinType typeID={bin.typeID} /> */}
      <Divider variant="middle" />
      <BinRules
        isEditMode={true}
        selectedRuleSet={selectedRuleSet}
        allRuleSets={allRuleSets} />
      <BinRecyclePoints
        allRecyclePoints={allRecyclePoints}
        selectedRuleSet={selectedRuleSet}
        setSelectedRecyclePoint={setSelectedRecyclePoint} />
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={saveBin}>Save</Button>
      </DialogActions>
    </S.BinCreation>);
};