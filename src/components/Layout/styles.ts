import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 24rem auto;
  grid-template-rows: 70px auto;

  grid-template-areas:   /* define as áreas da tela */
    'menu princ' /* podemos dar o nome que quiser p/ as áreas */
    'menu princ'
  ;

  height: 100vh;
  width: 100vw;  

  background-image: url('./bg-beer-2.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Main = styled.main`
  grid-area: princ;
  display: flex;  
  flex-direction: column;
`;
