import styled from 'styled-components'
import { animacao_para_esquerda } from '@/styles/keyframes';

export const Main = styled.main`
  grid-area: princ;
  display: flex;  
  flex-direction: column;
  padding: 15px 20px;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 50% auto; /* 2 colunas */

`;
  
export const ChartContainer = styled.div`
  flex: 1;
  
`;

export const LegendContainer = styled.div`
  /* display: flex;
  background-color: red; */

`;
