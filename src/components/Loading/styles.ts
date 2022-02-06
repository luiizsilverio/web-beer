import styled from 'styled-components'

export const Container = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 250px;
  height: 250px;
  position: absolute;
  left: -25px;
  top: 250px;
  z-index: 55;
  
  @media(max-width: 740px) {
    left: calc(50% - 125px);
    top: calc(50% - 125px);    
    border-radius: 125px;
    background-color: rgba(0, 0, 0, .2);
    box-shadow: -4px -4px 4px 8px rgba(0, 0, 0, .2);
  }
`;
