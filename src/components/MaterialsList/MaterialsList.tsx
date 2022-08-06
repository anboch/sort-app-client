import { Chip, ListItemText } from '@mui/material';
import React from 'react';
import { IMaterial } from '../../mock/api.interface';
import { StyledMaterialsList, MaterialItem, MaterialTitles, TagsList, MaterialInfo } from './MaterialsListStyles';

export interface MaterialsListProps {
  materials: IMaterial[]
}

export const MaterialsList = ({ materials }: MaterialsListProps): JSX.Element => {
  return (
    <StyledMaterialsList>
      {materials.length > 0 &&
        materials?.map(({ _id, titles, categoryID, clusterID }) => (
          <MaterialItem key={_id}>
            <MaterialTitles>
              {titles.map((title) => (
                <ListItemText key={title} secondary={`- ${title}`} />
              ))}
            </MaterialTitles>
            <MaterialInfo>
              <div >
                <Chip label={categoryID.title} size="small" />
              </div>
              <TagsList>
                {clusterID?.titles.map((title) => (
                  <Chip key={title} label={title} variant="outlined" size="small" />
                ))}
              </TagsList>
            </MaterialInfo>
          </MaterialItem>))}
    </StyledMaterialsList>
  );
};