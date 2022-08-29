import { Chip, ListItemText, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import React from 'react';
import { IMaterial, IRule, IType } from '../../api/api.interface';
import { StyledMaterialList, MaterialTitles, Tags, MaterialInfo, SimilarMaterial, MaterialPreview, MaterialAcceptInfo, MaterialDescription, SimilarMaterialAndDescription, MaterialRules, MaterialImages, Buttons } from './MaterialListStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export interface MaterialListProps {
  materials: IMaterial[]
}

export const MaterialList = ({ materials }: MaterialListProps): JSX.Element => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // TODO add message that materials have not found
  return (
    <StyledMaterialList>
      {materials.length > 0 &&
        materials?.map(({ _id, titles, tagIDs, similarMaterialIDs, sortedRules, description, typeIDs }) => (
          <Accordion key={_id} sx={{ width: "95%" }} expanded={expanded === _id} onChange={handleChange(_id)}>
            {/* <MaterialItem key={_id}> */}
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            // aria-controls="panel1bh-content"
            // id="panel1bh-header"
            >
              <MaterialPreview>
                <MaterialTitles>
                  {titles.map((title) => (
                    <ListItemText key={title} primary={`- ${title}`} />
                  ))}
                </MaterialTitles>
                <MaterialAcceptInfo>
                  {typeIDs.length > 0 &&
                    <PublishedWithChangesIcon color='success' />
                  }
                </MaterialAcceptInfo>
                <Tags>
                  {tagIDs.map((tag) => (
                    <Chip key={tag.titles[0]} label={tag.titles.join(', ')} variant="outlined" size="small" />
                  ))}
                </Tags>
              </MaterialPreview>
            </AccordionSummary>
            <AccordionDetails>
              <MaterialInfo>
                <SimilarMaterialAndDescription>
                  {similarMaterialIDs.length > 0 &&
                    <SimilarMaterial>
                      <Typography variant={"subtitle2"}>Often confused with:</Typography>
                      {similarMaterialIDs.map((material) => (
                        <ListItemText key={material._id} secondary={`- ${material.titles.join(', ')}`} />
                      ))}
                    </SimilarMaterial>}
                  <MaterialDescription>
                    <Typography variant={"body2"}>{description}</Typography>
                  </MaterialDescription>
                </SimilarMaterialAndDescription>
                <MaterialRules>
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
                </MaterialRules>
                <MaterialImages>
                  <MaterialImages></MaterialImages>
                </MaterialImages>
              </MaterialInfo>
              <Buttons>
                <Button size="small" variant="contained" endIcon={<PlaylistAddIcon />}>
                  Add to bin
                </Button>
              </Buttons>
            </AccordionDetails>
            {/* </MaterialItem> */}
          </Accordion>
        ))
      }
    </StyledMaterialList >
  );
};