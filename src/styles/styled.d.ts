import 'styled-components';
import { Theme } from '@mui/material/styles';
import { ICustomTheme } from './theme';

declare module '@mui/material/styles' {
  interface Theme extends ICustomTheme {}
  interface ThemeOptions extends ICustomTheme {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
