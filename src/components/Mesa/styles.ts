import styled from 'styled-components'

interface MesaProps {
  ocupado: boolean
  fechar?: boolean
  width: number
  height: number
}

export const Button = styled.button`
  flex: 1;
  align-items: center;
  padding: 8px;
  width: 100%;
`;

// h: 100, w:100 cabe ate 15 mesas
// h: 100, w:80 cabe ate 20 mesas
// h:85, w:80 cabe ate 24 mesas
export const Container = styled.div<MesaProps>`
  height: ${props => props.height}px; //100px;
  width: ${props => props.width}px;   //100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-color: ${props => props.ocupado ? "#ffb6b6" : "#d6d6ff"};
  border-width: 4px;
  margin: ${props => props.height === 85 ? 6 : 8}px;
  background-color: ${props => props.ocupado 
    ? '#cd5c5c'
    : '#f4ede8'
  };  
`;

interface Props {
  fechar?: boolean
}

export const Title = styled.h2<Props>`
  font-weight: bold;
  font-size: 24px;
  color: ${props => props.fechar
    ? 'yellow' 
    : '#f4ede8'
  };
`;
