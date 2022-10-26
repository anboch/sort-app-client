import { Chip, ListItemText, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { IMaterial, IUser } from '../../api/api.interface';
import * as S from './MaterialItemStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { AddToBinForm } from '../AddToBinForm/AddToBinForm';
import { LoginFormContext } from '../../context/LoginFormContext';
import { UseQueryResult } from '@tanstack/react-query';
import { getIDs } from '../../utils/utils';

export interface MaterialItemProps {
  material: IMaterial
  userQ: UseQueryResult<IUser, unknown>
}

export const MaterialItem = ({ material, userQ }: MaterialItemProps): JSX.Element => {
  const { _id, titles, tagIDs, similarMaterialIDs, sortedRules, description, typeIDs } = material;
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [isAddToBinFormOpen, setIsAddToBinFormOpen] = useState(false);
  const { setIsOpen: setIsLoginFormOpen } = useContext(LoginFormContext);

  const handleAddToBin = (): void => {
    if (!userQ.data) {
      setIsLoginFormOpen(true);
    } else {
      setIsAddToBinFormOpen(true);
    }
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <S.MaterialItem>
      {isAddToBinFormOpen && <AddToBinForm setIsOpen={setIsAddToBinFormOpen} materialTypeIds={getIDs(typeIDs)} />}
      <Accordion sx={{ width: "95%" }} expanded={expanded === _id} onChange={handleChange(_id)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        // aria-controls="panel1bh-content"
        // id="panel1bh-header"
        >
          <S.MaterialPreview>
            <S.MaterialTitles>
              {titles.map((title) => (
                <ListItemText key={title} primary={`- ${title}`} />
              ))}
            </S.MaterialTitles>
            <S.MaterialAcceptInfo>
              {typeIDs.length > 0 &&
                <PublishedWithChangesIcon color='success' />
              }
            </S.MaterialAcceptInfo>
            <S.Tags>
              {tagIDs.map((tag) => (
                <Chip key={tag.titles[0]} label={tag.titles.join(', ')} variant="outlined" size="small" />
              ))}
            </S.Tags>
          </S.MaterialPreview>
        </AccordionSummary>
        <AccordionDetails>
          <S.MaterialInfo>
            <S.SimilarMaterialAndDescription>
              {similarMaterialIDs.length > 0 &&
                <S.SimilarMaterial>
                  <Typography variant={"subtitle2"}>Often confused with:</Typography>
                  {similarMaterialIDs.map((material) => (
                    <ListItemText key={material._id} secondary={`- ${material.titles.join(', ')}`} />
                  ))}
                </S.SimilarMaterial>}
              <S.MaterialDescription>
                <Typography variant={"body2"}>{description}</Typography>
              </S.MaterialDescription>
            </S.SimilarMaterialAndDescription>
            <S.MaterialRules>
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
            </S.MaterialRules>
            <S.MaterialImages>
              Images
            </S.MaterialImages>
          </S.MaterialInfo>
          <S.Buttons>
            {typeIDs.length > 0 &&
              <Button
                onClick={() => handleAddToBin()}
                size="small"
                variant="contained"
                endIcon={<PlaylistAddIcon />}>
                Add to bin
              </Button>
            }
          </S.Buttons>
        </AccordionDetails>
      </Accordion>
    </S.MaterialItem>
  );
};