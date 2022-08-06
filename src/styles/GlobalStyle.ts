import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  overflow-x: hidden;
}

body {
  font: 400 16px 'Roboto', sans-serif;
  letter-spacing: -0.02em;
  /* background-color: green; */
}
`;
