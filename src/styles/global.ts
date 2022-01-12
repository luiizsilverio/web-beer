import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {  
    --background: rgb(31, 32, 36);
    --orange: #ff872c;
    --back_black: #18161c;
  }  

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

  body {
    background: var(--background); 
    -webkit-font-smoothing: antialiased;
		font-family: Roboto, Open-Sans, Helvetica, Sans-Serif;    
  }
  
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; /*15px*/
    }

    @media (max-width: 720px) {
      font-size: 87.5%; /*14px*/
    }
    
    button {
      cursor: pointer;
    }

    [disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`