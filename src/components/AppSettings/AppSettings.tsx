import { Button, ButtonGroup, Typography } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext, themeModeTypes } from '../../context/ThemeContext';
import * as S from './AppSettingsStyles';

export const AppSettings = () => {
  const { themeMode, toggleThemeMode } = useContext(ThemeContext);

  return (
    <S.AppSettings>
      <Typography sx={{ display: 'flex', justifyContent: 'end' }} variant="subtitle1">
        настройки приложения
      </Typography>
      <S.ColorTheme>
        <Typography variant="caption">цветовая тема</Typography>
        <ButtonGroup
          sx={{ justifyContent: 'center' }}
          size="small"
          aria-label="outlined primary button group"
        >
          <Button
            variant={themeMode === themeModeTypes.LIGHT ? 'contained' : undefined}
            onClick={() => toggleThemeMode(themeModeTypes.LIGHT)}
          >
            Светлая
          </Button>
          <Button
            variant={themeMode === themeModeTypes.AUTO ? 'contained' : undefined}
            onClick={() => toggleThemeMode(themeModeTypes.AUTO)}
          >
            Авто
          </Button>
          <Button
            variant={themeMode === themeModeTypes.DARK ? 'contained' : undefined}
            onClick={() => toggleThemeMode(themeModeTypes.DARK)}
          >
            Тёмная
          </Button>
        </ButtonGroup>
      </S.ColorTheme>
    </S.AppSettings>
  );
};
