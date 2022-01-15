import styled from 'styled-components'

export const Container = styled.header`
  grid-area: main;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.6rem;
  background-color: var(--background);
  font-family: Roboto; //'Open Sans';
  
  height: 60px;
  width: calc(100% - 22rem);
  /* width: 100%; */
  
  font-size: 1.2rem;  
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  
  position: fixed;
  top: 0;
  
  h1 {
    font-weight: 500;
    color: var(--white);
    text-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
  }
`;

