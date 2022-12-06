import {
  ListItemText,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Dialog,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { IBin, IMaterial, IUser } from '../../api/api.interface';
import * as S from './MaterialItemStyles';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddIcon from '@mui/icons-material/Add';
import { AddToBinForm } from '../AddToBinForm/AddToBinForm';
import { UseQueryResult } from '@tanstack/react-query';
import { getId, getIDs } from '../../utils/utils';
import { BinCreation } from '../BinCreation/BinCreation';
import { useGetTypes } from '../../hooks/useGetTypes';

// interface IExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: IExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export const MaterialItemTitles = ({ titles }: Pick<IMaterial, 'titles'>): JSX.Element => {
  return (
    <S.MaterialTitles>
      {titles.map((title) => (
        <ListItemText key={title} primary={`- ${title}`} />
      ))}
    </S.MaterialTitles>
  );
};

export const MaterialItemInfo = ({ material }: { material: IMaterial }): JSX.Element => {
  const { similarMaterialIDs, description, sortedRules, tagIDs } = material;
  // todo add links to often confused materials
  return (
    <S.MaterialInfo>
      <S.SimilarMaterialAndDescription>
        {similarMaterialIDs?.length > 0 && (
          <S.SimilarMaterial>
            <S.MaterialInfoItemTitle>Часто путают с:</S.MaterialInfoItemTitle>

            {similarMaterialIDs.map((material) => (
              <ListItemText key={material._id} primary={`- ${material.titles.join(', ')}`} />
              // <Link
              //       key={material._id}
              //       sx={{ padding: '3px' }}
              //       component="button"
              //       variant="body2"
              //       underline="hover"
              //       onClick={() => setMaterialForPreview(material)}
              //     // todo , to pseudo element
              //     >
              //       {material.titles[0]},
              //     </Link>
            ))}
          </S.SimilarMaterial>
        )}
        <S.MaterialDescription>
          {!!description?.length && <S.MaterialInfoItemTitle>Описание:</S.MaterialInfoItemTitle>}
          <Typography variant={'body1'}>{description}</Typography>
        </S.MaterialDescription>
      </S.SimilarMaterialAndDescription>
      {sortedRules && (
        <S.MaterialRules>
          {sortedRules.generalRules.length > 0 && (
            <S.MaterialInfoItemTitle>Общие правила:</S.MaterialInfoItemTitle>
          )}
          {sortedRules.generalRules.map((rule) => (
            <ListItemText key={rule._id} primary={`- ${rule.description}`} />
          ))}
          {sortedRules.localRules.length > 0 && (
            <S.MaterialInfoItemTitle>Правила для некоторых пунктов приема:</S.MaterialInfoItemTitle>
          )}
          {sortedRules.localRules.map((rule) => (
            <ListItemText key={rule._id} primary={`- ${rule.description}`} />
          ))}
        </S.MaterialRules>
      )}
      <S.Tags>
        {/* todo add filter on tag click */}
        {!!tagIDs.length && <S.MaterialInfoItemTitle>Тэги:</S.MaterialInfoItemTitle>}
        {tagIDs.map((tag) => (
          <S.Tag key={tag.titles[0]}>
            <Typography variant="body2">{tag.titles.join(', ')}</Typography>
          </S.Tag>
        ))}
      </S.Tags>
      {/* <S.MaterialImages>
              Images
            </S.MaterialImages> */}
    </S.MaterialInfo>
  );
};

export interface IMaterialItemProps {
  material: IMaterial;
  userQ: UseQueryResult<IUser, unknown>;
  binsQ: UseQueryResult<IBin[], unknown>;
}

export const MaterialItem = ({ material, userQ, binsQ }: IMaterialItemProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isAddToBinFormOpen, setIsAddToBinFormOpen] = useState(false);
  const suitableBin = useMemo(
    () => binsQ.data?.find((bin) => getIDs(material.typeIDs).includes(getId(bin.typeID))),
    [binsQ.data, material.typeIDs]
  );
  const hasTypes = material.typeIDs.length > 0;
  const typeQs = useGetTypes(getIDs(material.typeIDs), isAddToBinFormOpen);
  const hasAdditionalInfo =
    !!material?.description?.length ||
    !!material?.sortedRules?.generalRules.length ||
    !!material?.sortedRules?.localRules.length ||
    !!material?.tagIDs.length;

  // const handleAddToBin = (): void => {
  // if (!userQ.data) {
  //   setIsLoginFormOpen(true);
  // } else {
  //   setIsAddToBinFormOpen(true);
  // }
  // };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  // todo redo make green, red or yellow borders for cards
  return (
    <S.MaterialItem>
      <Dialog
        fullWidth
        scroll={'body'}
        open={isAddToBinFormOpen}
        onClose={() => setIsAddToBinFormOpen(false)}
      >
        {isAddToBinFormOpen && suitableBin && (
          <AddToBinForm setIsOpen={setIsAddToBinFormOpen} material={material} bin={suitableBin} />
        )}
        {isAddToBinFormOpen && !suitableBin && (
          <BinCreation
            materialTitles={material.titles}
            setIsOpen={setIsAddToBinFormOpen}
            materialTypes={typeQs.map((typeQ) => typeQ.data)}
            userQ={userQ}
            userBins={binsQ.data}
          />
        )}
      </Dialog>
      <Card
        variant="outlined"
        sx={{
          width: '95%',
          maxWidth: '800px',
          borderColor: hasTypes ? 'success.light' : 'warning.light',
        }}
      >
        <CardContent>
          <S.MaterialPreview>
            <MaterialItemTitles titles={material.titles} />
            {/* <S.MaterialAcceptInfo>
              {typeIDs.length > 0 &&
                <PublishedWithChangesIcon color='success' />
              }
            </S.MaterialAcceptInfo> */}
          </S.MaterialPreview>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {/* <S.Buttons> */}
          <>
            {hasTypes && (
              <Button
                onClick={() => setIsAddToBinFormOpen(true)}
                size="small"
                variant="contained"
                endIcon={suitableBin ? <PlaylistAddIcon /> : <AddIcon />}
              >
                В переработку
              </Button>
            )}
          </>

          {hasAdditionalInfo && (
            <Button
              onClick={handleExpandClick}
              size="small"
              variant={'contained'}
              aria-label="show more"
              color="secondary"
              // endIcon={<PlaylistAddIcon />}
            >
              {isExpanded ? 'Скрыть' : 'Инфо'}
            </Button>
          )}
          {/* </S.Buttons> */}
          {/* <ExpandMore
            expand={isExpanded}
            onClick={handleExpandClick}
            aria-isExpanded={isExpanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore> */}
        </CardActions>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <MaterialItemInfo material={material} />
          </CardContent>
        </Collapse>
      </Card>
    </S.MaterialItem>
  );
};
