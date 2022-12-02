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
  theme: typeof themeModeTypes['LIGHT' | 'DARK'];
  themeMode: ValueOf<typeof themeModeTypes>;
  toggleThemeMode: (newMode: ValueOf<typeof themeModeTypes>) => void;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const userPrefersMode = useMediaQuery('(prefers-color-scheme: dark)')
    ? themeModeTypes.DARK
    : themeModeTypes.LIGHT;

  const [themeMode, setThemeMode] = useState<ValueOf<typeof themeModeTypes>>(
    (localStorage.getItem(localStorageKeys.themeMode) as ValueOf<typeof themeModeTypes> | null) ??
      userPrefersMode
  );
  const [theme, setTheme] = useState<typeof themeModeTypes['LIGHT' | 'DARK']>(
    themeMode === themeModeTypes.AUTO ? userPrefersMode : themeMode
  );

  const toggleThemeMode = (newMode: ValueOf<typeof themeModeTypes>): void => {
    localStorage.setItem(localStorageKeys.themeMode, newMode);
    setThemeMode(newMode);
    setTheme(newMode === themeModeTypes.AUTO ? userPrefersMode : newMode);
  };

  const themeWithMode = useMemo(() => {
    return createTheme({
      palette: {
        mode: theme,
        ...customPaletteForTheme.common,
        ...customPaletteForTheme[theme],
      },
      ...customVarsForTheme,
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleThemeMode }}>
      <SCThemeProvider theme={themeWithMode}>
        <MUIThemeProvider theme={themeWithMode}>
          <CssBaseline enableColorScheme />
          {children}
        </MUIThemeProvider>
      </SCThemeProvider>
    </ThemeContext.Provider>
  );
};
