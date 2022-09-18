import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Checkbox, Collapse, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect } from 'react';

import * as S from './BinStyles';
import { IBin, IRule, IRuleSet, IType } from '../../api/api.interface';
import { useState } from 'react';
import { useUpdateBin } from '../../hooks/useUpdateBin';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ExpandMore } from '@mui/icons-material';
import { useGetType } from '../../hooks/useGetType';
import { useGetUniqRulesSortedByQuantity } from '../../hooks/useGetUniqRulesSortedByQuantity';
import { getId, getIDs } from '../../utils/utils';
import { useGetRuleSet } from '../../hooks/useGetRuleSet';
import { EditableValue } from '../common/EditableValue';

const BinTitle = ({ _id, title = '' }: Pick<IBin, '_id' | 'title'>) => {
  const binM = useUpdateBin();
  const mutationFunc = (inputValue: string) => binM.mutate({ _id, title: inputValue })

  return (
    <S.BinTitle>
      <EditableValue mutationFunc={mutationFunc} value={title} />
    </S.BinTitle>
  );
};

const BinType = ({ typeID }: Pick<IBin, 'typeID'>) => {

  return (
    <>
      {typeof typeID === 'object' && typeID.title &&
        <>
          <Typography variant="caption" >
            type
          </Typography>
          <Typography >{typeID.title}</Typography>
        </>
      }
    </>);

};

const BinRules = ({ ruleSetID }: { ruleSetID: IRuleSet | undefined }) => {

  return (
    <>
      <Typography variant="caption" >
        rules
      </Typography>
      {ruleSetID && ruleSetID.ruleIDs.map((rule) => {
        if (typeof rule === 'object' && rule.description) {
          return (<Typography key={rule._id}>- {rule.description}</Typography>);
        }
      })
      }
    </>);

};

const BinRecyclePoints = ({ ruleSetID }: { ruleSetID: IRuleSet | undefined }) => {

  return (
    <>
      <Typography variant="caption" >
        recycle points
      </Typography>
      {typeof ruleSetID === 'object' && ruleSetID.recyclePointIDs.map((recyclePoint) => {
        if (typeof recyclePoint === 'object' && recyclePoint.title) {
          return (<Typography key={recyclePoint._id}>- {recyclePoint.title}</Typography>);
        }
      })
      }
    </>);
};

const BinActions = ({ isSettingsOpen, setIsSettingsOpen }: { isSettingsOpen: boolean, setIsSettingsOpen: Dispatch<SetStateAction<boolean>> }) => {

  const handleExpandClick = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  return (
    <S.BinActions>
      <IconButton
        onClick={handleExpandClick}
        size="small">
        <SettingsIcon fontSize="inherit" />
      </IconButton>
    </S.BinActions>
  );
};

// todo. better typeID: Pick<IBin, 'typeID'>['typeID']
const BinSettings = ({ binId, typeID, isSettingsOpen, currentRuleSetId }:
  { binId: string, typeID: IType, isSettingsOpen: boolean, currentRuleSetId: string }) => {

  const typeQ = useGetType(getId(typeID), isSettingsOpen);
  const binM = useUpdateBin();
  const uniqRulesSortedByQuantity = useGetUniqRulesSortedByQuantity(typeQ.data?.ruleSetIDs || []);

  const isRuleInRuleSet = (rule: IRule, ruleSet: IRuleSet): boolean => {
    return !!getIDs(ruleSet.ruleIDs).find(id => id === rule._id);
  };

  const changeCurrentRuleSet = (newRuleSetId: string) => {
    if (currentRuleSetId !== newRuleSetId) {
      binM.mutate({ _id: binId, ruleSetID: newRuleSetId });
    }
  };


  return (
    <Collapse in={isSettingsOpen} timeout="auto" unmountOnExit>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {typeQ.data?.ruleSetIDs.map(ruleSet => (
                <TableCell key={ruleSet._id} align="center">
                  <Checkbox
                    checked={currentRuleSetId === ruleSet._id}
                    onChange={() => changeCurrentRuleSet(ruleSet._id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Number of recycle points</TableCell>
              {typeQ.data?.ruleSetIDs.map(ruleSet => (
                <TableCell key={ruleSet._id} align="center">{ruleSet.recyclePointIDs.length}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqRulesSortedByQuantity.map((rule) => (
              <TableRow
                key={rule._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {rule.description}
                </TableCell>
                {typeQ.data?.ruleSetIDs.map(ruleSet => (
                  <TableCell key={ruleSet._id} align="center">{isRuleInRuleSet(rule, ruleSet) && <CheckCircleIcon />}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Collapse>
  );
};

export const Bin = ({ bin }: { bin: IBin }): JSX.Element => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const ruleSetQ = useGetRuleSet(getId(bin.ruleSetID));


  return (
    <S.Bin>
      <BinTitle
        _id={bin._id}
        title={bin.title}
      />
      <BinType typeID={bin.typeID} />
      <Divider variant="middle" />
      <BinRules ruleSetID={ruleSetQ.data} />
      <BinRecyclePoints ruleSetID={ruleSetQ.data} />
      <Divider variant="middle" />
      <BinActions isSettingsOpen setIsSettingsOpen={setIsSettingsOpen} />
      <BinSettings
        binId={bin._id}
        typeID={bin.typeID}
        isSettingsOpen={isSettingsOpen}
        currentRuleSetId={getId(bin.ruleSetID)} />
    </S.Bin>);
};