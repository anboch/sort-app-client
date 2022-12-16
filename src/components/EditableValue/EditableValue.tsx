import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography, IconButton, TextField } from '@mui/material';

import * as S from './EditableValueStyles';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface IEditableValueProps {
  mutationFunc: (inputValue: string) => void;
  currentValue: string | undefined;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  title: string;
  errorMessage?: string | null | undefined;
}

export const EditableValue = ({
  mutationFunc,
  currentValue = '',
  inputValue,
  setInputValue,
  title,
  errorMessage,
}: IEditableValueProps): JSX.Element => {
  const [isEditMode, setIsEditMode] = useState(false);
  const ref = useOutsideClick(() => setIsEditMode(false));

  const closeInputWithSave = () => {
    if (currentValue !== inputValue.trim()) {
      mutationFunc(inputValue.trim());
    }
  };

  useEffect(() => {
    setIsEditMode(false);
  }, [currentValue]);

  useEffect(() => {
    setInputValue(currentValue);
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
              {currentValue !== inputValue.trim() && !errorMessage && (
                <IconButton
                  // todo add listener on enter button and run closeInputWithSave
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
            {currentValue ? (
              <Typography variant="subtitle1">{currentValue}</Typography>
            ) : (
              <Typography display="inline" onClick={() => setIsEditMode(true)} variant="subtitle1">
                Введите {title}...
              </Typography>
            )}
          </S.Value>
        ) : (
          <S.Value>
            <TextField
              autoFocus
              value={inputValue}
              onChange={(e): void => setInputValue(e.target.value)}
              id="filled-basic"
              // label={title}
              variant="standard"
              size="small"
              error={!!errorMessage}
              helperText={errorMessage ? errorMessage : null}
            />
          </S.Value>
        )}
      </S.EditableValue>
    </>
  );
};
