import 'styled-components';
import { Theme as MUITheme } from '@mui/material/styles';
import { ICustomVarsForTheme } from './theme';

declare module '@mui/material/styles' {
  interface Theme extends ICustomVarsForTheme {}
  interface ThemeOptions extends ICustomVarsForTheme {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends MUITheme {}
}
