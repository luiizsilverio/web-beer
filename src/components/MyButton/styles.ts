import styled from 'styled-components'

export const ButtonContainer = styled.button`
  background-color: var(--orange);
  font-family: Roboto, 'Sans Serif', sans-serif;
  font-weight: bold;
  font-size: 1.7rem;
  color: var(--background);   
  padding: 10px;
  border-radius: 8px;
  margin: 6px 0;
  transition: filter .2s;
  border: none;
  transition: filter .2s;
  transition: transform .4s;

  &:active, &:hover {
    filter: brightness(70%);
  }

  &:active {
    filter: sepia(10%);
    transform: scale(1.02);    
  }
`;