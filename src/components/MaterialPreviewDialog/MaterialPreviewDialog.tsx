import { Dispatch, SetStateAction } from 'react';
import { Dialog } from '@mui/material';
import { IMaterial } from '../../api/api.interface';
import { MaterialItemInfo, MaterialItemTitles } from '../MaterialItem/MaterialItem';

interface IMaterialPreviewProps {
  material: IMaterial | null;
  setMaterial: Dispatch<SetStateAction<IMaterial | null>>;
}

export const MaterialPreviewDialog = ({
  material,
  setMaterial,
}: IMaterialPreviewProps): JSX.Element => {
  const handleCloseDialog = (): void => {
    setMaterial(null);
  };

  return (
    <Dialog fullWidth scroll={'body'} open={!!material} onClose={handleCloseDialog}>
      {material && (
        <div style={{ padding: '10px' }}>
          <MaterialItemTitles titles={material.titles} />
          <MaterialItemInfo material={material} />
        </div>
      )}
    </Dialog>
  );
};
