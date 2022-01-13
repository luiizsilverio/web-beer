import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 25rem auto;
  grid-template-rows: 70px auto;

  grid-template-areas:   /* define as áreas da tela */
    'menu cabec' /* podemos dar o nome que quiser p/ as áreas */
    'menu princ'
  ;

  height: 100vh;
  width: 100vw;  

  background-image: url('./bg-beer-2.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Header = styled.header`
  grid-area: cabec;
  background-color: var(--background);
`;

export const Main = styled.main`
  grid-area: princ;
  display: flex;  
  flex-direction: column;
  padding: 15px 20px;
`;

export const Card = styled.div`
  display: flex;
  height: 15rem;
  width: 100%;
  border-radius: 2rem;
  background-color: var(--background);
  filter: opacity(50%);
  margin-bottom: 1.5rem;
`;

export const Title = styled.div`
  display: flex;
  height: 6rem;
  align-items: flex-start;
  justify-content: space-between;
  font-family: 'Open Sans';
  font-size: 2rem;

  h1 {
    font-weight: 700;
    color: var(--white);
    text-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
  }
`;
