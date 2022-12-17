import { layoutGridAreas } from '../components/layout/Layout';

export const customPaletteForTheme = {
  common: {
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ecc6ad',
    },
  },
  light: {},
  dark: {
    background: {
      default: '#303030',
      paper: '#424242',
    },
  },
};

export const customVarsForTheme = {
  layoutGridAreas: {
    body: layoutGridAreas.BODY,
    header: layoutGridAreas.HEADER,
    footer: layoutGridAreas.FOOTER,
  },
  shape: {
    borderRadius: 10,
  },
};

export type ICustomVarsForTheme = {
  [Key in keyof typeof customVarsForTheme]: typeof customVarsForTheme[Key];
};
