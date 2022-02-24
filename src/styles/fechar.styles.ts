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
  background-color: rgba(31, 32, 36, 0.95);
  box-shadow: 1px 1px 6px 4px rgba(0, 0, 0, .2);
  padding: 8px;

  animation: ${animacao_crescer} 0.2s linear;

  ul {
    flex: 0.94;
    list-style: none;
    overflow-y: auto;

    animation: ${animacao_subir} 0.5s ease-out;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(86, 99, 115, 0.3);
      border-radius: 5px;
    }

    ::-webkit-scrollbar-track {
      background-color: rgba(86, 99, 115, 0.3);
    }
  }

  footer {
    display: flex;
    flex: 0.06;
    align-items: center;
    justify-content: flex-end;

    background-color: rgba(86, 99, 115, 0.4);
    /* border: 1px solid var(--background); */
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
