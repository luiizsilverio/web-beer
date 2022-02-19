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
  flex-direction: column;
  flex: 1;
  background-color: rgba(31, 32, 36, 0.9);
  box-shadow: 1px 1px 6px 4px rgba(0, 0, 0, .2);
  animation: ${animacao_crescer} 0.2s linear;
  padding: 8px;


  ul {
    flex: 0.93;
    list-style: none;
  }

  footer {
    display: flex;
    flex: 0.07;
    align-items: center;
    justify-content: flex-end;

    background-color: rgba(31, 32, 36, 0.6);
    border: 1px solid var(--background);
    padding: 8px 12px;
    gap: 16px;

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
