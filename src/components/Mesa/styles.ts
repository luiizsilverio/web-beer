import styled from 'styled-components'

interface MesaProps {
  ocupado: boolean
  fechar?: boolean
  width: number
  height: number
}

export const Button = styled.button<MesaProps>`
  align-items: center;
  padding: 8px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  padding: 8px;
  background-color: ${props => props.ocupado ? '#cd5c5c' : '#f4ede8'};
  border: 4px solid ${props => props.ocupado ? "#e36666" : "#d6d6ff"};
  border-radius: 20px;
  margin: 8px;  //ffb6b6

  -webkit-box-shadow: 4px 4px 10px 4px rgba(0,0,0,0.14);
  -moz-box-shadow: 4px 4px 10px 4px rgba(0,0,0,0.14);
  box-shadow: 4px 4px 10px 4px rgba(0,0,0,0.14);

  h2 {
    font-weight: bold;
    font-size: 24px;
    color: ${props => props.fechar ? 'yellow' : '#0f86fa'};
  }

  transition: 0.2s transform;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
