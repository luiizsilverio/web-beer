import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 22rem auto;
  grid-template-rows: 60px auto;

  grid-template-areas:   /* define as áreas da tela */
    'menu princ' /* podemos dar o nome que quiser p/ as áreas */
    'menu princ'
  ;

  height: 100vh;
  
  background-image: url('./bg-beer-2.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;  
`;
