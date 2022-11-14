enum gridAreasEnum {
  body = 'body',
  header = 'header',
  footer = 'footer',
}

export const customPaletteForTheme = {
  common: {
    primary: {
      main: '#94c2e0',
    },
    secondary: {
      main: '#e0b294',
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
  gridAreas: {
    body: gridAreasEnum.body,
    header: gridAreasEnum.header,
    footer: gridAreasEnum.footer,
  },
  shape: {
    borderRadius: 10,
  },
};

export type ICustomVarsForTheme = {
  [Key in keyof typeof customVarsForTheme]: typeof customVarsForTheme[Key];
};
