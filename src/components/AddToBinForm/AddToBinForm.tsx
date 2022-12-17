import { Dispatch, SetStateAction } from 'react';
import { Typography, DialogTitle, DialogActions, Button } from '@mui/material';

import * as S from './AddToBinFormStyles';
import { getId } from '../../utils/utils';
import { IBin, IMaterial } from '../../api/api.interface';
import { useGetRuleSet } from '../../hooks/useGetRuleSet';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

interface IAddToBinFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  material: IMaterial;
  bin: IBin;
}

export const AddToBinForm = ({ setIsOpen, material, bin }: IAddToBinFormProps): JSX.Element => {
  const ruleSetQ = useGetRuleSet(getId(bin.ruleSetID));
  const handleCloseDialog = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <DialogTitle>Отлично</DialogTitle>
      {/* todo add info about the bin */}
      <S.AddToBinContent>
        <div>
          <Typography variant="body1" display="inline">
            {'Положите материал '}
          </Typography>
          <S.CustomChip>{material.titles[0]}</S.CustomChip>
          {/* <Typography variant="body1" display="inline">
            {`"${material.titles[0]}"`}
          </Typography> */}
          <div>
            <Typography variant="body1" display="inline">
              {bin?.title ? 'в корзину c названием ' : 'в корзину'}
            </Typography>
            {bin?.title && <S.CustomChip>{bin?.title}</S.CustomChip>}
          </div>
          {/* <Typography variant="h6" display="inline">
            {bin?.title}
          </Typography> */}
        </div>
        {/* <div>
          <Typography display="block" variant="caption">
            тип корзины
          </Typography>
          {typeof bin.typeID === 'object' && <Typography>{bin.typeID?.title}</Typography>}
        </div> */}
        <div>
          {ruleSetQ.data &&
            typeof ruleSetQ.data?.ruleIDs === 'object' &&
            !!ruleSetQ.data.ruleIDs.length && (
              <>
                <Typography variant="subtitle2">правила</Typography>
                {ruleSetQ.data.ruleIDs.map((rule) => {
                  if (typeof rule === 'object' && rule.description) {
                    return <Typography key={rule._id}>- {rule.description}</Typography>;
                  }
                })}
              </>
            )}
          {ruleSetQ.isLoading && ruleSetQ.isFetching && <LoadingSpinner />}
        </div>
      </S.AddToBinContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>OK</Button>
      </DialogActions>
    </>
  );
};
