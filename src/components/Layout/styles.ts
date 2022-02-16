import styled from 'styled-components'

const aside_width = process.env.NEXT_PUBLIC_ASIDE_WIDTH || 210
const header_height = process.env.NEXT_PUBLIC_HEADER_HEIGHT || 50

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${ props => aside_width }px auto;
  grid-template-rows: ${ props => header_height }px auto;

  grid-template-areas:   /* define as áreas da tela */
    'menu princ' /* podemos dar o nome que quiser p/ as áreas */
    'menu princ'
  ;

  height: 100vh;

  background-image: url('./bg-beer-2.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;


  @media(max-width: 740px ) {
	  grid-template-columns: auto;
    grid-template-areas:
      'princ'
      'princ'
    ;
	}
`;
