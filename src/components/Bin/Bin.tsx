import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Button,
  Collapse,
  DialogActions,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import MapIcon from '@mui/icons-material/Map';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import * as S from './BinStyles';
import { IBin, IMaterial, IRecyclePoint, IRuleSet } from '../../api/api.interface';
import { useState } from 'react';
import { useUpdateBin } from '../../hooks/useUpdateBin';
import { useGetType } from '../../hooks/useGetType';
import { useGetUniqRulesSortedByQuantity } from '../../hooks/useGetUniqRulesSortedByQuantity';
import { getId, getIDs } from '../../utils/utils';
import { useGetRuleSet } from '../../hooks/useGetRuleSet';
import { EditableValue } from '../common/EditableValue';
import { useChangeSelectedRecyclePoint } from '../../hooks/useChangeSelectedRecyclePoint';
import { AlertDialog } from '../AlertDialog/AlertDialog';
import { useGetMaterialsByType } from '../../hooks/useGetMaterialsByType';
import { MaterialPreviewDialog } from '../MaterialPreviewDialog/MaterialPreviewDialog';
import { RecyclePointsOfBinOnMap } from '../RecyclePointsOfBinOnMap/RecyclePointsOfBinOnMap';
import { useDeleteBin } from '../../hooks/useDeleteBin';
import { useGetBins } from '../../hooks/useGetBins';

const BinTitle = ({ _id, title = '' }: Pick<IBin, '_id' | 'title'>) => {
  const [inputValue, setInputValue] = useState(title);
  const binM = useUpdateBin();
  const binsQ = useGetBins();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mutationFunc = (inputValue: string) => binM.mutate({ _id, title: inputValue });
  const duplicateCheck = (title: string) => {
    if (title && !!binsQ.data && binsQ.data?.map((bin) => bin.title).includes(title.trim())) {
      setErrorMessage('Корзина с таким названием уже существует');
    } else {
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    if (title !== inputValue) {
      duplicateCheck(inputValue);
    } else {
      setErrorMessage(null);
    }
  }, [inputValue]);

  return (
    <>
      <EditableValue
        mutationFunc={mutationFunc}
        inputValue={inputValue}
        setInputValue={setInputValue}
        currentValue={title}
        title={'название'}
        errorMessage={errorMessage}
      />
    </>
  );
};

export const BinType = ({ typeID }: Pick<IBin, 'typeID'>) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [materialForPreview, setMaterialForPreview] = useState<IMaterial | null>(null);
  const materialsQ = useGetMaterialsByType(getId(typeID), isExpanded);

  const handleExpandClick = () => {
    setIsExpanded((prev) => !prev);
  };

  // todo change Loading...
  return (
    <S.BinType>
      <S.BinTypeSummary>
        <Typography variant="caption">тип</Typography>
        <S.TypeTitle>
          {typeof typeID === 'object' && <Typography component="span">{typeID?.title}</Typography>}
        </S.TypeTitle>
        <S.BinTypeActions>
          <div>
            <S.ExpandMore
              expand={isExpanded}
              onClick={handleExpandClick}
              aria-expanded={isExpanded}
              aria-label="подходящие материалы"
            >
              <ExpandMoreIcon />
            </S.ExpandMore>
          </div>
        </S.BinTypeActions>
      </S.BinTypeSummary>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <div>
          {materialsQ.data ? (
            materialsQ.data.map((material) => {
              return (
                <S.BinTypeMaterialItem
                  key={material._id}
                  variant="body2"
                  onClick={() => setMaterialForPreview(material)}
                >
                  {material.titles[0]}
                </S.BinTypeMaterialItem>
              );
            })
          ) : materialsQ.isError ? (
            <Typography>Error...</Typography>
          ) : materialsQ.isLoading ? (
            <span>Loading...</span>
          ) : null}
        </div>
      </Collapse>
      <MaterialPreviewDialog material={materialForPreview} setMaterial={setMaterialForPreview} />
    </S.BinType>
  );
};

export const BinRules = ({
  selectedRuleSet,
  allRuleSets,
  isEditMode = false,
}: {
  selectedRuleSet: IRuleSet | null;
  allRuleSets: IRuleSet[] | null;
  isEditMode?: boolean;
}) => {
  const theme = useTheme();
  const uniqRulesSortedByQuantity = useGetUniqRulesSortedByQuantity(
    isEditMode ? allRuleSets || [] : selectedRuleSet ? [selectedRuleSet] : []
  );
  const selectedRuleIds = getIDs(selectedRuleSet?.ruleIDs ?? []);
  const isSelected = (ruleId: string) => (isEditMode ? selectedRuleIds?.includes(ruleId) : true);

  // todo change 'Loading..'
  // todo fixed hight of rules before choose RP
  return (
    <S.BinRules>
      <Typography display="block" variant="caption">
        правила
      </Typography>
      {isEditMode && allRuleSets && !selectedRuleSet ? (
        <Typography color={theme.palette.info.main} variant="subtitle1">
          Выберите пункт приема на карте, чтобы увидеть правила
        </Typography>
      ) : allRuleSets ? (
        uniqRulesSortedByQuantity.map((rule) => {
          if (typeof rule === 'object' && rule.description) {
            return (
              <S.BinRule key={rule._id} selected={isSelected(rule._id)}>
                - {rule.description}
              </S.BinRule>
            );
          }
        })
      ) : (
        <Typography>Loading...</Typography>
      )}
    </S.BinRules>
  );
};

interface IBinRecyclePointsProps {
  isEditMode: boolean;
  ruleSetOfBin: IRuleSet | null;
  selectedRecyclePoint: IRecyclePoint | null;
  allRecyclePoints: IRecyclePoint[];
  selectedRuleSet: IRuleSet | null;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  setSelectedRecyclePoint: Dispatch<SetStateAction<IRecyclePoint | null>>;
}

export const RecyclePointsOfBin = ({
  isEditMode,
  ruleSetOfBin,
  selectedRecyclePoint,
  allRecyclePoints,
  selectedRuleSet,
  setIsEditMode,
  setSelectedRecyclePoint,
}: IBinRecyclePointsProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [downloadMap, setDownloadMap] = useState<boolean>(false);
  const infoAboutSelectedAndAllRecyclePoints =
    ruleSetOfBin?.recyclePointIDs.length === allRecyclePoints.length
      ? allRecyclePoints.length
      : `${
          isEditMode
            ? selectedRuleSet?.recyclePointIDs.length
            : ruleSetOfBin?.recyclePointIDs.length
        } из ${allRecyclePoints.length}`;

  const handleChange = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    setIsExpanded(isEditMode);
  }, [isEditMode]);

  useEffect(() => {
    if (isExpanded) {
      setDownloadMap(true);
    } else if (isEditMode) {
      setIsEditMode(false);
    }
  }, [isExpanded]);

  return (
    <div>
      <Typography variant="caption">пункты приёма</Typography>
      <S.RecyclePointsOfBinSummary>
        {ruleSetOfBin && allRecyclePoints && (
          <Typography>
            По выбранным правилам{' '}
            <Typography component="span" style={{ whiteSpace: 'nowrap' }}>
              {`принимают: ${infoAboutSelectedAndAllRecyclePoints}`}
            </Typography>
          </Typography>
        )}
        <IconButton onClick={handleChange}>
          <MapIcon />
        </IconButton>
      </S.RecyclePointsOfBinSummary>
      <Collapse in={isExpanded} timeout="auto">
        {downloadMap && (
          <RecyclePointsOfBinOnMap
            selectedRecyclePoint={selectedRecyclePoint}
            isEditMode={isEditMode}
            allRecyclePoints={allRecyclePoints}
            selectedRuleSet={selectedRuleSet}
            setSelectedRecyclePoint={setSelectedRecyclePoint}
          />
        )}
      </Collapse>
    </div>
  );
};

const BinActions = ({ bin }: { bin: IBin }): JSX.Element => {
  const deleteBinM = useDeleteBin();
  const deleteBin = () => deleteBinM.mutate(bin._id);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const deleteAlertMessage = bin.title
    ? `Вы действительно хотите удалить корзину с названием: ${bin.title} ?`
    : 'Вы действительно хотите удалить корзину?';

  const handleDeleteClick = () => {
    setIsAlertOpen(true);
  };

  // todo add handleConfirmDelete with success sign

  // todo add hint to Edit button when it's disabled
  return (
    <S.BinActions>
      <DialogActions>
        <Button onClick={handleDeleteClick}>Удалить</Button>
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

  const {
    allRuleSets,
    allRecyclePoints,
    selectedType,
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

  // todo add spinner while loading ruleSetQ
  return (
    <S.Bin>
      <S.BinPropertyContainer>
        <BinTitle _id={bin._id} title={bin.title} />
      </S.BinPropertyContainer>
      <S.BinPropertyContainer>
        <BinType typeID={bin.typeID} />
      </S.BinPropertyContainer>
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
      <BinActions bin={bin} />
    </S.Bin>
  );
};
