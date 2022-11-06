import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Collapse, DialogActions, Divider, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

import { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Map } from '../../components/Map/Map';
import * as S from './BinStyles';
import { IBin, IMaterial, IRecyclePoint, IRule, IRuleSet } from '../../api/api.interface';
import { useState } from 'react';
import { useUpdateBin } from '../../hooks/useUpdateBin';
import { useGetType } from '../../hooks/useGetType';
import { useGetUniqRulesSortedByQuantity } from '../../hooks/useGetUniqRulesSortedByQuantity';
import { getId, getIDs } from '../../utils/utils';
import { useGetRuleSet } from '../../hooks/useGetRuleSet';
import { EditableValue } from '../common/EditableValue';
import { useChangeSelectedRecyclePoint } from '../../hooks/useChangeSelectedRecyclePoint';
import { useDeleteBin } from '../../hooks/useDeleteBin';
import { AlertDialog } from '../AlertDialog/AlertDialog';
import { useGetMaterialsByType } from '../../hooks/useGetMaterialsByType';
import { MaterialPreviewDialog } from '../MaterialPreviewDialog/MaterialPreviewDialog';

const BinTitle = ({ _id, title = '' }: Pick<IBin, '_id' | 'title'>) => {
  const binM = useUpdateBin();
  const mutationFunc = (inputValue: string) => binM.mutate({ _id, title: inputValue });

  return (
    <S.BinTitle>
      <EditableValue
        mutationFunc={mutationFunc}
        value={title}
        title={'title'} />
    </S.BinTitle>
  );
};

export const BinType = ({ typeID }: Pick<IBin, 'typeID'>) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [materialForPreview, setMaterialForPreview] = useState<IMaterial | null>(null);
  const materialsQ = useGetMaterialsByType(getId(typeID), isExpanded)

  const handleChange = () => {
    setIsExpanded((prev) => !prev);
  };

  // todo change Loading...
  return (

    <>
      <Typography variant="caption" >
        type
      </Typography>
      <Accordion expanded={isExpanded} onChange={handleChange}>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          {
            (typeof typeID === 'object') &&
            <Typography >{typeID?.title}</Typography>
          }
        </AccordionSummary>
        <AccordionDetails>
          <>
            {materialsQ.data &&
              materialsQ.data.map(material => {
                return (
                  <Link
                    key={material._id}
                    sx={{ padding: '3px' }}
                    component="button"
                    variant="body2"
                    underline="hover"
                    onClick={() => setMaterialForPreview(material)}
                  // todo , to pseudo element
                  >
                    {material.titles[0]},
                  </Link>
                )
              })}
            {materialsQ.isError && <Typography>Error...</Typography>}
            {materialsQ.isLoading && <span>Loading...</span>}
          </>
        </AccordionDetails>
      </Accordion>
      <MaterialPreviewDialog
        material={materialForPreview}
        setMaterial={setMaterialForPreview} />
    </>

  );

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
              return (
                <S.BinRule key={rule._id} selected={isSelected(rule._id)}>
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
  isCreateMode?: boolean,
  allRecyclePoints: IRecyclePoint[],
  selectedRuleSet: IRuleSet | null,
  setIsEditMode?: Dispatch<SetStateAction<boolean>>,
  setSelectedRecyclePoint: Dispatch<SetStateAction<IRecyclePoint | null>>
}

export const BinRecyclePoints = ({
  isEditMode = true,
  isCreateMode = false,
  // selectedRecyclePoint,
  allRecyclePoints,
  selectedRuleSet,
  setIsEditMode,
  setSelectedRecyclePoint
}: IBinRecyclePointsProps) => {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [downloadMap, setDownloadMap] = useState<boolean>(false)

  const isSelected = (recyclePointId: string) => getIDs((selectedRuleSet?.recyclePointIDs ?? [])).includes(recyclePointId);

  // todo to styles
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

  const style2 = {
    width: '100%',
    height: '100%',
  };

  // todo add handle error if REACT_APP_MAPBOX_ACCESS_TOKEN is undefined
  return (
    <>
      <Typography variant="caption" >
        recycle points
      </Typography>
      <MapGL
        style={{ width: '100%', height: '400px' }}
        // mapStyle='mapbox://styles/mapbox/light-v9'
        mapStyle="mapbox://styles/mapbox/streets-v8"
        accessToken={mapboxPublicAccessToken}
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

const BinActions = ({ allRuleSets, isEditMode, setCurrentRecyclePointAsSelected, setIsEditMode, deleteBin, handleSaveClick }:
  {
    allRuleSets: IRuleSet[] | null,
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

  // todo add hint to Edit button when it's disabled
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
            <Button disabled={allRuleSets?.length === 1} onClick={handleEditClick}>Edit</Button>
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

export const Bin = ({ bin }: { bin: IBin }): JSX.Element => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
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
        allRuleSets={allRuleSets}
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
        setIsEditMode={setIsEditMode}
        setSelectedRecyclePoint={setSelectedRecyclePoint} />
    </S.Bin>);
};