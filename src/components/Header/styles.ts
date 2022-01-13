import styled from 'styled-components'

export const Container = styled.header`
  grid-area: main;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: var(--background);
  font-family: 'Open Sans';
  font-size: 1.5rem;  
  height: 70px;
  width: 100%;
  
  h1 {
    font-weight: 700;
    color: var(--text-light);
    text-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
  }
`;

