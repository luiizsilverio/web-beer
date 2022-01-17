import styled from 'styled-components'
import { animacao_para_esquerda } from '@/styles/keyframes';

export const Main = styled.main`
  grid-area: princ;
  display: flex;  
  flex-direction: column;
  padding: 20px;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 50% auto; 
`;

export const LegendContainer = styled.div`
  background-color: blue;
  width: 160px;
`;

export const ChartContainer = styled.div`
  display: flex;
  flex: 1;  
  /* background-color: red; */
`;

export const TotalContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;  
  justify-content: center;
  padding-left: 15px;
  position: relative;
  
  svg {
    position: absolute;
    z-index: 7;
    right: -65px;
    top: -38px;
    color: rgba(158, 255, 195, 0.1);
  }
`;

export const Valor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 4px 0;
  
  span {
    font-size: 1.6rem;
    margin-right: 10px;
    color: var(--text-light);
    font-weight: lighter;
  }
  
  h2 {
    font-size: 2.4rem;
    color: var(--white);
  }
`;
