import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${ props => process.env.NEXT_PUBLIC_ASIDE_WIDTH }px auto;
  grid-template-rows: ${ props => process.env.NEXT_PUBLIC_HEADER_HEIGHT }px auto;

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
