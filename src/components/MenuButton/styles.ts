import styled from 'styled-components'

export const Container = styled.button`
  width: 38px;
  height: 34px;
  border-radius: 5px;
  font-size: 22px;
  background-color: var(--orange);
  color: var(--background);
  transition: opacity .3s;
  border: none;
  cursor: pointer;
  transition: filter .2s;
    
  &:hover {
    /* filter: sepia(70%); */
    filter: brightness(70%);

  }
  
  position: absolute;
  top: 8px;
  left: 8px;
  display: none;
  
  @media(max-width: 740px) {
    display: flex;
    justify-content: center;
    align-items: center;
  } 
`;
