import { useState } from 'react';
import { Collapse, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import * as S from './BinTypeStyles';
import { useGetMaterialsByType } from '../../hooks/useGetMaterialsByType';
import { getId } from '../../utils/utils';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { MaterialPreviewDialog } from '../MaterialPreviewDialog/MaterialPreviewDialog';
import { IBin, IMaterial } from '../../api/api.interface';

export const BinType = ({ typeID }: Pick<IBin, 'typeID'>) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [materialForPreview, setMaterialForPreview] = useState<IMaterial | null>(null);
  const materialsQ = useGetMaterialsByType(getId(typeID), isExpanded);

  const handleExpandClick = () => {
    setIsExpanded((prev) => !prev);
  };

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
          ) : materialsQ.isLoading && materialsQ.isFetching ? (
            <LoadingSpinner />
          ) : null}
        </div>
      </Collapse>
      <MaterialPreviewDialog material={materialForPreview} setMaterial={setMaterialForPreview} />
    </S.BinType>
  );
};
