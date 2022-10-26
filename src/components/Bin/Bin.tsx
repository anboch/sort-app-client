import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Checkbox, Collapse, DialogActions, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';

import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import * as S from './BinStyles';
import { IBin, IRecyclePoint, IRule, IRuleSet, IType } from '../../api/api.interface';
import { useState } from 'react';
import { useUpdateBin } from '../../hooks/useUpdateBin';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ExpandMore } from '@mui/icons-material';
import { useGetType } from '../../hooks/useGetType';
import { useGetUniqRulesSortedByQuantity } from '../../hooks/useGetUniqRulesSortedByQuantity';
import { getId, getIDs } from '../../utils/utils';
import { useGetRuleSet } from '../../hooks/useGetRuleSet';
import { EditableValue } from '../common/EditableValue';
import { useChangeSelectedRecyclePoint } from '../../hooks/useChangeSelectedRecyclePoint';
import { useGetTypes } from '../../hooks/useGetTypes';
import { useDeleteBin } from '../../hooks/useDeleteBin';
import { AlertDialog } from '../AlertDialog/AlertDialog';

const BinTitle = ({ _id, title = '' }: Pick<IBin, '_id' | 'title'>) => {
  const binM = useUpdateBin();
  const mutationFunc = (inputValue: string) => binM.mutate({ _id, title: inputValue });

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

export const BinRules = ({ selectedRuleSet, allRuleSets, isEditMode = false }:
  { selectedRuleSet: IRuleSet | null, allRuleSets: IRuleSet[] | null, isEditMode?: boolean }) => {
  const uniqRulesSortedByQuantity = useGetUniqRulesSortedByQuantity(isEditMode ? (allRuleSets || []) : (selectedRuleSet ? [selectedRuleSet] : []));
  const selectedRuleIds = getIDs(selectedRuleSet?.ruleIDs ?? []);
  const isSelected = (ruleId: string) => isEditMode ? selectedRuleIds?.includes(ruleId) : true;

  // todo change 'Loading..'
  return (
    <>
      <Typography variant="caption" >
        rules
      </Typography>
      {(isEditMode && allRuleSets && selectedRuleIds.length === 0) ? (
        <Typography variant='subtitle1' >
          Choose a recycling point to see rules
        </Typography>
      ) : (
        (allRuleSets && selectedRuleIds.length > 0) ? (
          uniqRulesSortedByQuantity.map((rule) => {
            if (typeof rule === 'object' && rule.description) {
              return (<S.BinRule key={rule._id} selected={isSelected(rule._id)}>
                - {rule.description}
              </S.BinRule>);
            }
          })
        ) : (
          <Typography>
            Loading...
          </Typography>)
      )}
    </>
  );
};

interface IBinRecyclePointsProps {
  // selectedRecyclePoint: IRecyclePoint | null,
  isEditMode?: boolean,
  allRecyclePoints: IRecyclePoint[],
  selectedRuleSet: IRuleSet | null,
  setSelectedRecyclePoint: Dispatch<SetStateAction<IRecyclePoint | null>>
}

export const BinRecyclePoints = ({
  isEditMode = true,
  // selectedRecyclePoint,
  allRecyclePoints,
  selectedRuleSet,
  setSelectedRecyclePoint
}: IBinRecyclePointsProps) => {
  const [viewport, setViewport] = useState({
    latitude: 55.755836,
    longitude: 37.617659,
    zoom: 9
  });
  const isSelected = (recyclePointId: string) => getIDs((selectedRuleSet?.recyclePointIDs ?? [])).includes(recyclePointId);

  const styleSelected = {
    padding: '10px',
    color: '#fff',
    cursor: 'pointer',
    background: '#19c850',
    borderRadius: '6px'
  };

  const style = {
    padding: '5px',
    color: '#fff',
    cursor: 'pointer',
    background: '#5d6972',
    borderRadius: '6px'
  };



  return (
    <>
      <Typography variant="caption" >
        recycle points
      </Typography>
      <MapGL
        style={{ width: '100%', height: '400px' }}
        // mapStyle='mapbox://styles/mapbox/light-v9'
        mapStyle="mapbox://styles/mapbox/streets-v8"
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        onViewportChange={setViewport}
      >
        {allRecyclePoints.map(recyclePoint => {
          if (isEditMode || isSelected(recyclePoint._id)) {
            return (
              <Marker
                key={recyclePoint._id}
                latitude={recyclePoint?.position?.coordinates.latitude ?? null}
                longitude={recyclePoint?.position?.coordinates.longitude ?? null}
                onClick={() => setSelectedRecyclePoint(recyclePoint)}
              >
                <div style={isSelected(recyclePoint._id) ? styleSelected : style}>!</div>
              </Marker>
            );
          }
        })}
      </MapGL>
    </>
  );
};

const BinActions = ({ isEditMode, setCurrentRecyclePointAsSelected, setIsEditMode, deleteBin, handleSaveClick }:
  {
    isEditMode: boolean,
    setCurrentRecyclePointAsSelected: () => void,
    deleteBin: () => void,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    handleSaveClick: () => void
  }) => {

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const deleteAlertMessage = 'Do you want to delete the bin?'

  const handleEditClick = () => {
    setCurrentRecyclePointAsSelected();
    setIsEditMode(true);
  };

  const handleDeleteClick = () => {
    setIsAlertOpen(true);
  };

  // todo add handleConfirmDelete with success sign

  return (
    <S.BinActions>
      <DialogActions>
        {isEditMode ?
          (<>
            <Button onClick={handleSaveClick}>Save</Button>
            <Button onClick={() => setIsEditMode(false)}>Cancel</Button>
          </>)
          :
          (<>
            <Button onClick={handleDeleteClick}>Delete</Button>
            <Button onClick={handleEditClick}>Edit</Button>
          </>)
        }
      </DialogActions>
      <AlertDialog
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        message={deleteAlertMessage}
        action={deleteBin}
      />
    </S.BinActions>
  );
};

const BinSettings = ({ binId, typeID, isSettingsOpen, currentRuleSetId }:
  { binId: string, typeID: IBin['typeID'], isSettingsOpen: boolean, currentRuleSetId: string }) => {

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
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  // const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const ruleSetQ = useGetRuleSet(getId(bin.ruleSetID));
  const typeQ = useGetType(getId(bin.typeID));
  const binM = useUpdateBin();
  const deleteBinM = useDeleteBin();
  const {
    allRuleSets,
    allRecyclePoints,
    selectedType,
    selectedRuleSet,
    selectedRecyclePoint,
    setSelectedRecyclePoint,
  } = useChangeSelectedRecyclePoint(useMemo(() => [typeQ.data], [typeQ.data]));

  const setCurrentRecyclePointAsSelected = () => setSelectedRecyclePoint(typeof ruleSetQ.data?.recyclePointIDs[0] === 'object' ? ruleSetQ.data?.recyclePointIDs[0] : null);

  const deleteBin = () => deleteBinM.mutate(bin._id);

  const saveUpdatedBin = () => {
    if (selectedRuleSet && selectedRuleSet?._id !== getId(bin.ruleSetID)) {
      binM.mutate({ _id: bin._id, ruleSetID: selectedRuleSet?._id },
        {
          onSuccess() {
            // todo add loading and Success sign
            setIsEditMode(false);
          },
        });
    } else {
      setIsEditMode(false);
    }
    // todo handle selectedRuleSet === null
  };

  // todo add spinner while loading ruleSetQ
  return (
    <S.Bin>
      <BinActions
        isEditMode={isEditMode}
        setCurrentRecyclePointAsSelected={setCurrentRecyclePointAsSelected}
        setIsEditMode={setIsEditMode}
        deleteBin={deleteBin}
        handleSaveClick={saveUpdatedBin} />
      <BinTitle
        _id={bin._id}
        title={bin.title}
      />
      <BinType typeID={bin.typeID} />
      <Divider variant="middle" />
      <BinRules
        isEditMode={isEditMode}
        // todo create constant
        selectedRuleSet={isEditMode ? selectedRuleSet : (ruleSetQ.data ?? null)}
        allRuleSets={allRuleSets} />
      <BinRecyclePoints
        isEditMode={isEditMode}
        // todo create constant
        selectedRuleSet={isEditMode ? selectedRuleSet : (ruleSetQ.data ?? null)}
        allRecyclePoints={allRecyclePoints}
        setSelectedRecyclePoint={setSelectedRecyclePoint} />
      {/* <Divider variant="middle" /> */}
      {/* <BinSettings
        binId={bin._id}
        typeID={bin.typeID}
        isSettingsOpen={isSettingsOpen}
        currentRuleSetId={getId(bin.ruleSetID)} /> */}
    </S.Bin>);
};