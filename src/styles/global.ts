import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {  
    --background: rgb(31, 32, 36);
    --orange: #ff872c;
    --back_black: #18161c;
    --text-light: #c1c1c1;
    --white: #f1f1f1
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