import { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';
import {
  createTheme,
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { ValueOf } from '../../components/common/types';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { localStorageKeys } from '../../components/common/constants';
import { customPaletteForTheme, customVarsForTheme } from '../../styles/theme';

export const themeModeTypes = { AUTO: 'auto', LIGHT: 'light', DARK: 'dark' } as const;

interface IThemeContext {
  themeMode: ValueOf<typeof themeModeTypes>;
  toggleThemeMode: (newMode: ValueOf<typeof themeModeTypes>) => void;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const [themeMode, setThemeMode] = useState<ValueOf<typeof themeModeTypes>>(
    (localStorage.getItem(localStorageKeys.themeMode) as ValueOf<typeof themeModeTypes> | null) ??
      themeModeTypes.AUTO
  );
  const userPrefersMode = useMediaQuery('(prefers-color-scheme: dark)')
    ? themeModeTypes.DARK
    : themeModeTypes.LIGHT;

  const toggleThemeMode = (newMode: ValueOf<typeof themeModeTypes>): void => {
    localStorage.setItem(localStorageKeys.themeMode, newMode);
    setThemeMode(newMode);
  };

  const themeWithMode = useMemo(() => {
    const mode = themeMode === themeModeTypes.AUTO ? userPrefersMode : themeMode;
    return createTheme({
      palette: {
        mode,
        ...customPaletteForTheme.common,
        ...customPaletteForTheme[mode],
      },
      ...customVarsForTheme,
    });
  }, [userPrefersMode, themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
      <SCThemeProvider theme={themeWithMode}>
        <MUIThemeProvider theme={themeWithMode}>
          <CssBaseline enableColorScheme />
          {children}
        </MUIThemeProvider>
      </SCThemeProvider>
    </ThemeContext.Provider>
  );
};
