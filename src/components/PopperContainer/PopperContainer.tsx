import { IconButton, Popper } from '@mui/material';
import { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import * as S from './PopperContainerStyle';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { IRecyclePoint } from '../../api/api.interface';

const popperOptions = {
  modifiers: [
    {
      name: 'preventOverflow',
      enabled: true,
      options: {
        altAxis: true,
      },
    },
  ],
};

interface IPopperContainerProps {
  children: ReactNode;
  withOpenedInfo: HTMLElement | null;
  selectedRecyclePoint: IRecyclePoint | null;
  setWithOpenedInfo: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export const PopperContainer = ({
  children,
  withOpenedInfo,
  selectedRecyclePoint,
  setWithOpenedInfo,
}: IPopperContainerProps): JSX.Element => {
  const refOutsideClick = useOutsideClick(() => setWithOpenedInfo(null));

  return (
    <Popper
      style={{ maxWidth: '90%', maxHeight: '50%', overflow: 'auto', zIndex: 2 }}
      disablePortal
      popperOptions={popperOptions}
      anchorEl={withOpenedInfo}
      ref={refOutsideClick}
      open={!!withOpenedInfo && !!selectedRecyclePoint}
    >
      <S.Info>
        {children}
        <div>
          <IconButton size="small" sx={{ padding: 0 }} onClick={() => setWithOpenedInfo(null)}>
            <CloseIcon />
          </IconButton>
        </div>
      </S.Info>
    </Popper>
  );
};
