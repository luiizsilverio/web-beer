import styled from 'styled-components'

const TAM = 250;

export const Container = styled.div`
  width: ${props => TAM}px;
  height: ${props => TAM}px;

  position: absolute;
  left: 50%;
  top: calc(50% - ${props => TAM / 2}px);
  z-index: 55;

  border-radius: 125px;
  background-color: rgba(0, 0, 0, .3);
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, .3);
  filter: opacity(50%);

  @media(max-width: 740px) {
    left: calc(50% - ${props => TAM / 2}px);
    border-radius: ${props => TAM / 2}px;
  }

  .lottie {
    width: ${props => TAM}px;
    height: ${props => TAM}px;
  }
`;
