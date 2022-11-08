enum gridAreasEnum {
  body = 'body',
  header = 'header',
  footer = 'footer',
}

export interface ICustomTheme {
  bg: {
    main: string;
    light: string;
  };
  gridAreas: {
    [key in gridAreasEnum]: string;
  };
}

export const theme = {
  bg: {
    main: '#fff',
    light: '#F4F5F7',
  },
  gridAreas: {
    body: gridAreasEnum.body,
    header: gridAreasEnum.header,
    footer: gridAreasEnum.footer,
  },
};

// export const theme = {
//   colors: {
//     primary: "",
//     secondary: "",
//   },
//   media: {
//     desktopSmall: "max-width: 1200px",
//     tabletBig: "max-width: 992px",
//     tabletSmall: "max-width: 768px",
//     phoneBig: "max-width: 576px",
//   },
// };
