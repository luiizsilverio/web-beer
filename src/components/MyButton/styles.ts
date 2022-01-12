import styled from 'styled-components'

export const ButtonContainer = styled.button`
  background-color: var(--orange);
  font-family: Roboto, 'Sans Serif', sans-serif;
  font-size: 1.7rem;
  color: black;   
  padding: 8px;
  border-radius: 12px;
  margin: 6px 0;
  transition: filter .2s;

  &:active {
    filter: brightness(50%);
  }

`;