import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as S from './AddToBinFormStyles';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetBins } from '../../hooks/useGetBins';
import { BinCreation } from '../BinCreation/BinCreation';
import { getId } from '../../utils/utils';
import { useGetTypes } from '../../hooks/useGetTypes';

export const AddToBinForm = ({ materialTypeIds, setIsOpen }: { materialTypeIds: string[], setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element => {
  const binsQ = useGetBins();
  const suitableBin = binsQ.data?.find(bin => materialTypeIds.includes(getId(bin.typeID)));
  const typeQs = useGetTypes(materialTypeIds);

  const handleCloseDialog = () => { setIsOpen(false); };

  return (
    <Dialog fullWidth scroll={'body'} open onClose={handleCloseDialog}>
      {binsQ.isFetching &&
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>}
      {binsQ.isSuccess && suitableBin &&
        <S.ConfirmAdd>
          <DialogTitle>Success</DialogTitle>
          {/* todo add info about the bin */}
          <DialogContent>
            <DialogContentText display="inline">
              Put the material in the bin called
            </DialogContentText>
            <Typography display="inline" variant='h6'>
              {` ${suitableBin?.title}`}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>OK</Button>
          </DialogActions>
        </S.ConfirmAdd>}
      {binsQ.isSuccess && !suitableBin &&
        <BinCreation handleCloseDialog={handleCloseDialog} materialTypes={typeQs.map(typeQ => typeQ.data)} />
      }
    </Dialog >
  );
};
