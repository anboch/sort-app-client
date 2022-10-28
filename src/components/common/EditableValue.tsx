import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography, IconButton, TextField } from '@mui/material';

import * as S from './EditableValueStyles';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface IEditableValueProps {
  mutationFunc: (inputValue: string) => void,
  value: string | undefined,
  title: string
}

export const EditableValue = ({ mutationFunc, value = '', title }: IEditableValueProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const ref = useOutsideClick(() => setIsEditMode(false));

  const closeInputWithSave = () => {
    if (value !== inputValue) {
      mutationFunc(inputValue)
    }
    setIsEditMode(false);
  };

  useEffect(() => {
    setInputValue(value);
  }, [isEditMode]);

  return (<>
    {!isEditMode &&
      <S.ValuePreview>
        <div>
          <Typography variant="caption" >
            {title}
          </Typography>
          {value
            ? <Typography variant="h6" >
              {value}
            </Typography>
            : <Typography onClick={() => setIsEditMode(true)} variant="subtitle1" >
              Enter a value...
            </Typography>
          }
        </div>
        <IconButton
          onClick={() => setIsEditMode(true)}
          size="small">
          <EditIcon fontSize="inherit" />
        </IconButton>
      </S.ValuePreview>
    }
    {isEditMode &&
      <S.ValueEdit>
        <div ref={ref}>
          <TextField
            value={inputValue}
            onChange={(e): void => setInputValue(e.target.value)}
            id="filled-basic"
            label="Bin title"
            variant="filled"
            size="small" />
          <IconButton
            // add listener on enter button and run closeInputWithSave
            onClick={() => closeInputWithSave()}
            size="small">
            <SaveIcon fontSize="inherit" />
          </IconButton>
        </div>
        <IconButton
          onClick={() => setIsEditMode(false)}
          size="small">
          <CancelIcon fontSize="inherit" />
        </IconButton>
      </S.ValueEdit>
    }
  </>);
};