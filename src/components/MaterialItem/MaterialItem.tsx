import { Chip, ListItemText, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Dialog } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { IBin, IMaterial, IUser } from '../../api/api.interface';
import * as S from './MaterialItemStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
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
  )
}

export const MaterialItemInfo = ({ material }: { material: IMaterial }): JSX.Element => {
  const { similarMaterialIDs, description, sortedRules, tagIDs } = material
  return (
    <S.MaterialInfo>
      <S.SimilarMaterialAndDescription>
        {similarMaterialIDs.length > 0 &&
          <S.SimilarMaterial>
            <Typography variant={"subtitle2"}>Often confused with:</Typography>
            {similarMaterialIDs.map((material) => (
              <ListItemText key={material._id} secondary={`- ${material.titles.join(', ')}`} />
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
          </S.SimilarMaterial>}
        <S.MaterialDescription>
          <Typography variant={"body2"}>{description}</Typography>
        </S.MaterialDescription>
      </S.SimilarMaterialAndDescription>
      {sortedRules && <S.MaterialRules>
        {sortedRules.generalRules.length > 0 &&
          <Typography variant={"subtitle2"}>General rules:</Typography>
        }
        {sortedRules.generalRules.map((rule) =>
          (<ListItemText key={rule._id} secondary={`- ${rule.description}`} />)
        )}
        {sortedRules.localRules.length > 0 &&
          <Typography variant={"subtitle2"}>Rules for some recycle points:</Typography>
        }
        {sortedRules.localRules.map((rule) =>
          (<ListItemText key={rule._id} secondary={`- ${rule.description}`} />)
        )}
      </S.MaterialRules>}
      <S.Tags>
        <Typography variant={"subtitle2"}>Tags:</Typography>
        {tagIDs.map((tag) => (
          <Chip key={tag.titles[0]} label={tag.titles.join(', ')} variant="outlined" size="small" />
        ))}
      </S.Tags>
      {/* <S.MaterialImages>
              Images
            </S.MaterialImages> */}
    </S.MaterialInfo>
  )
}

export interface IMaterialItemProps {
  material: IMaterial
  userQ: UseQueryResult<IUser, unknown>
  binsQ: UseQueryResult<IBin[], unknown>
}

export const MaterialItem = ({ material, userQ, binsQ }: IMaterialItemProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isAddToBinFormOpen, setIsAddToBinFormOpen] = useState(false);
  const suitableBin = useMemo(() => binsQ.data?.find(bin => getIDs(material.typeIDs).includes(getId(bin.typeID))), [binsQ.data, material.typeIDs]);
  const hasTypes = material.typeIDs.length > 0
  const typeQs = useGetTypes(getIDs(material.typeIDs), isAddToBinFormOpen);

  const handleAddToBin = (): void => {
    // if (!userQ.data) {
    //   setIsLoginFormOpen(true);
    // } else {
    setIsAddToBinFormOpen(true);
    // }
  };

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
        onClose={() => setIsAddToBinFormOpen(false)}>
        {isAddToBinFormOpen && suitableBin &&
          <AddToBinForm
            setIsOpen={setIsAddToBinFormOpen}
            bin={suitableBin} />}
        {isAddToBinFormOpen && !suitableBin &&
          <BinCreation
            setIsOpen={setIsAddToBinFormOpen}
            materialTypes={typeQs.map(typeQ => typeQ.data)}
            userQ={userQ} />}
      </Dialog>
      <Card sx={{ width: "95%", maxWidth: '800px', border: hasTypes ? "1px solid #91d191" : '1px solid #d1ce91' }}>
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
        <CardActions sx={{ justifyContent: 'flex-end' }} >
          {/* <S.Buttons> */}
          <>
            {hasTypes && !userQ.data &&
              <Button
                onClick={() => handleAddToBin()}
                size="small"
                variant="contained"
                endIcon={<PlaylistAddIcon />}>
                For recycling
              </Button>
            }
            {hasTypes && userQ.data && !suitableBin &&
              <Button
                onClick={() => handleAddToBin()}
                size="small"
                variant="contained"
                endIcon={<AddIcon />}>
                Create new bin
              </Button>
            }
            {hasTypes && suitableBin &&
              <Button
                onClick={() => handleAddToBin()}
                size="small"
                variant="contained"
                endIcon={<PlaylistAddIcon />}>
                Add to bin
              </Button>
            }
          </>
          <Button
            onClick={handleExpandClick}
            size="small"
            variant='outlined'
            aria-label="show more"
          // endIcon={<PlaylistAddIcon />}
          >
            {isExpanded ? 'Hide' : 'Info'}
          </Button>
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
            <MaterialItemInfo
              material={material}
            />
          </CardContent>
        </Collapse>
      </Card>
    </S.MaterialItem>
  );
};