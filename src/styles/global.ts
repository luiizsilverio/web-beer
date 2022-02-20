import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: rgb(31, 32, 36);
    --back_light: #292823;  /* rgb(41, 40, 35); */
    --orange: #ff872c;
    --black: #18161c;
    --text-light: #e1e1e1;
    --white: #f1f1f1;
    --brown: #a17242;
    --ocre: #bb844c;
    --bege: #ffe4c4;
    --bege2: rgb(247, 208, 161);
    --cinza: rgb(180,180,170);
    --cinza2: #9AA5B1;
    --cinza3: #52667A;
    --cinza4: #313D49;
    --scrollbar: rgb(170,170,150);
    --abacate: #697A21;
  }

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
		font-family: Roboto, 'Open Sans', Helvetica, Sans-Serif;
  }

  html {
    font-size: 62.5%; /* equivale a 10px */;

    button {
      cursor: pointer;
    }

    [disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`