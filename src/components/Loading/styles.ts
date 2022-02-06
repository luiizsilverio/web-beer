import styled from 'styled-components'

const TAM = 250;

export const Container = styled.div`
  width: ${props => TAM}px;
  height: ${props => TAM}px;

  position: absolute;  
  left: -25px;
  top: 250px;
  z-index: 55;
  
  @media(max-width: 740px) {
    left: calc(50% - ${props => TAM / 2}px);
    top: calc(50% - ${props => TAM / 2}px);   
    border-radius: ${props => TAM / 2}px;
    background-color: rgba(0, 0, 0, .2);
    box-shadow: -4px -4px 4px 8px rgba(0, 0, 0, .2);
  }

  .lottie {
    width: ${props => TAM}px;
    height: ${props => TAM}px;
  }
`;
