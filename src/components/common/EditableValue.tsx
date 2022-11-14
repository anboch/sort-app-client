import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography, IconButton, TextField } from '@mui/material';

import * as S from './EditableValueStyles';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface IEditableValueProps {
  mutationFunc: (inputValue: string) => void;
  value: string | undefined;
  title: string;
}

export const EditableValue = ({ mutationFunc, value = '', title }: IEditableValueProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const ref = useOutsideClick(() => setIsEditMode(false));

  const closeInputWithSave = () => {
    if (value !== inputValue) {
      mutationFunc(inputValue);
    }
  };

  useEffect(() => {
    setIsEditMode(false);
  }, [value]);

  useEffect(() => {
    setInputValue(value);
  }, [isEditMode]);

  return (
    <>
      <S.EditableValue ref={ref}>
        <S.TitleAndActions>
          <Typography display="block" variant="caption">
            {title}
          </Typography>
          {!isEditMode ? (
            <div>
              <IconButton onClick={() => setIsEditMode(true)}>
                <EditIcon fontSize="inherit" />
              </IconButton>
            </div>
          ) : (
            <div>
              {value !== inputValue && (
                <IconButton
                  // add listener on enter button and run closeInputWithSave
                  onClick={() => closeInputWithSave()}
                  // size="small"
                >
                  <SaveIcon fontSize="inherit" />
                </IconButton>
              )}
              <IconButton onClick={() => setIsEditMode(false)}>
                <CancelIcon fontSize="inherit" />
              </IconButton>
            </div>
          )}
        </S.TitleAndActions>
        {!isEditMode ? (
          <S.Value>
            {value ? (
              <Typography variant="h6">{value}</Typography>
            ) : (
              <Typography display="inline" onClick={() => setIsEditMode(true)} variant="subtitle1">
                Введите {title}...
              </Typography>
            )}
          </S.Value>
        ) : (
          <S.Value>
            <TextField
              value={inputValue}
              onChange={(e): void => setInputValue(e.target.value)}
              id="filled-basic"
              // label={title}
              variant="standard"
              size="small"
            />
          </S.Value>
        )}
      </S.EditableValue>
    </>
  );
};
