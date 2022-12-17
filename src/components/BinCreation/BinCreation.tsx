import { Button, DialogActions, DialogTitle, TextField, Typography, useTheme } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

import * as S from './BinCreationStyles';
import { IBin, IType, IUser } from '../../api/api.interface';
import { useCreateBin } from '../../hooks/useCreateBin';
import { useChangeSelectedRecyclePoint } from '../../hooks/useChangeSelectedRecyclePoint';
import { LoginFormContext } from '../../context/LoginFormContext';
import { BinRules } from '../BinRules/BinRules';
import { RecyclePointsOnMap } from '../RecyclePointsOnMap/RecyclePointsOnMap';

interface IBinCreationProps {
  materialTitles: string[];
  materialTypes: (IType | undefined)[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userQ: UseQueryResult<IUser, unknown>;
  userBins: IBin[] | undefined;
}

export const BinCreation = ({
  materialTitles,
  materialTypes,
  setIsOpen,
  userQ,
  userBins,
}: IBinCreationProps): JSX.Element => {
  const theme = useTheme();
  const [titleValue, setTitleValue] = useState<string>(`№ ${userQ.data?.binCounter ?? 1}`);
  const [isDuplicateTitle, setIsDuplicateTitle] = useState(false);
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

  const saveBin = (): void => {
    if (!userQ.data) {
      setIsLoginFormOpen(true);
    } else if (selectedType && selectedRuleSet) {
      createBinM.mutate({
        title: titleValue.trim(),
        typeID: selectedType._id,
        ruleSetID: selectedRuleSet._id,
      });
    }
  };

  useEffect(() => {
    if (titleValue) {
      setIsDuplicateTitle(
        !!userBins && userBins?.map((bin) => bin.title).includes(titleValue.trim())
      );
    } else {
      setIsDuplicateTitle(false);
    }
  }, [titleValue]);

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
        <div>
          <Typography variant="body1" display="inline">
            {'для материала '}
          </Typography>
          <S.CustomChip>{materialTitles.join(', ')}</S.CustomChip>
        </div>
        <TextField
          sx={{ marginTop: theme.spacing(1) }}
          value={titleValue}
          onChange={(e): void => setTitleValue(e.target.value)}
          id="filled-basic"
          label="Название корзины"
          variant="outlined"
          size="small"
          error={isDuplicateTitle}
          helperText={isDuplicateTitle ? 'Корзина с таким названием уже существует' : null}
        />
        {/* <BinType typeID={bin.typeID} /> */}
        <BinRules isEditMode={true} selectedRuleSet={selectedRuleSet} allRuleSets={allRuleSets} />
      </S.BinCreationContent>
      <RecyclePointsOnMap
        selectedRecyclePoint={selectedRecyclePoint}
        allRecyclePoints={allRecyclePoints}
        selectedRuleSet={selectedRuleSet}
        setSelectedRecyclePoint={setSelectedRecyclePoint}
      />
      <DialogActions>
        <Button onClick={(): void => setIsOpen(false)}>Отмена</Button>
        <Button disabled={!selectedType || !selectedRuleSet || isDuplicateTitle} onClick={saveBin}>
          Создать
        </Button>
      </DialogActions>
    </>
  );
};
