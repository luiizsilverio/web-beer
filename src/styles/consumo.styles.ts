import styled from 'styled-components'
import { animacao_crescer, animacao_subir } from './keyframes';

export const Container = styled.div`
  grid-area: princ;
  display: flex;
  height: 100%;
  padding: 18px 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: rgba(31, 32, 36, 0.85);
  box-shadow: 1px 1px 6px 4px rgba(0, 0, 0, .2);
  padding: 8px;

  animation: ${animacao_crescer} 0.2s linear;

  footer {
    display: flex;
    flex: 0.06;
    align-items: center;
    justify-content: flex-end;

    background-color: rgba(86, 99, 115, 0.4);
    padding: 8px 12px;
    gap: 18px;

    h2 {
      font-size: 26px;
      color: var(--orange);
    }

    span {
      color: var(--bege);
      font-size: 26px;
      font-weight: lighter;
    }
  }
`;

export const ControlBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 200px;
  /* background-color: red; */
`;
