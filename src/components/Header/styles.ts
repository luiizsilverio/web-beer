import styled from 'styled-components'

export const Container = styled.header`
  grid-area: main;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: var(--background);
  font-family: Roboto; //'Open Sans';
  height: 60px;
  width: 100%;
  font-size: 1.4rem;  

  position: fixed;
  top: 0;
  
  h1 {
    font-weight: 500;
    color: var(--white);
    text-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
  }
`;

