import styled from 'styled-components'
import { animacao_crescer } from './keyframes';

export const Container = styled.div`
  grid-area: princ;
  display: flex;
  height: 100%;
  padding: 18px 20px;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  background-color: rgba(31, 32, 36, 0.9);
  border-radius: 10px;
  box-shadow: 1px 1px 6px 4px rgba(0, 0, 0, .2);

  animation: ${animacao_crescer} 0.2s linear;
`;
