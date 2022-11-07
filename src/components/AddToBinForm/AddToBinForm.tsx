import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as S from './AddToBinFormStyles';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetBins } from '../../hooks/useGetBins';
import { BinCreation } from '../BinCreation/BinCreation';
import { getId } from '../../utils/utils';
import { useGetTypes } from '../../hooks/useGetTypes';
import { Dispatch, useEffect, SetStateAction } from 'react';
import { IBin, IMaterial } from '../../api/api.interface';
import { useGetRuleSet } from '../../hooks/useGetRuleSet';
import { BinType } from '../Bin/Bin';

interface IAddToBinFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  material: IMaterial;
  bin: IBin;
}

export const AddToBinForm = ({ setIsOpen, material, bin }: IAddToBinFormProps): JSX.Element => {
  const ruleSetQ = useGetRuleSet(getId(bin.ruleSetID));
  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <S.ConfirmAdd>
      <DialogTitle>Отлично</DialogTitle>
      {/* todo add info about the bin */}
      <DialogContent>
        <DialogContentText display="inline">
          Положите материал: {material.titles[0]} в корзину с названием
          <span style={{ display: 'inline-block' }}>{bin?.title}</span>
        </DialogContentText>
        {/* <Typography display="inline" variant="h6">
          {` ${bin?.title}`}
        </Typography> */}
        <Typography display="block" variant="caption">
          тип корзины
        </Typography>
        {typeof bin.typeID === 'object' && <Typography>{bin.typeID?.title}</Typography>}
        <Typography display="block" variant="caption">
          правила
        </Typography>
        {ruleSetQ.data &&
          typeof ruleSetQ.data?.ruleIDs === 'object' &&
          ruleSetQ.data.ruleIDs.map((rule) => {
            if (typeof rule === 'object' && rule.description) {
              return <Typography key={rule._id}>- {rule.description}</Typography>;
            }
          })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>OK</Button>
      </DialogActions>
    </S.ConfirmAdd>
  );
};
