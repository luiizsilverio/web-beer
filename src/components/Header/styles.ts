import styled from 'styled-components'

export const Container = styled.header`
  grid-area: main;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: var(--background);
  font-family: Roboto; //'Open Sans';
  
  height: 60px;
  width: calc(100% - 22rem); /* 22rem é a largura do menu */
  
  position: fixed;
  top: 0;
  
  h1 {
    font-size: 2.6rem;     
    font-weight: 500;
    color: var(--bege); //var(--white);
  }
`;

