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

  footer {
    display: flex;
    flex: 0.06;
    align-items: center;
    justify-content: flex-end;
    position: relative;

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

    button {
      width: 200px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 20px;
      top: 0;
    }
  }
`;

export const ControlBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 70px;
  /* background-color: red; */
`;

export const FormContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  /* align-items: center; */

  width: 100%;
  background-color: rgba(86, 99, 115, 0.2);
  padding: 16px 20px;
  margin-bottom: 8px;
  overflow-y: auto;

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;

  label {
    color: var(--text-light);
    font-size: 16px;
  }

  select {
    font-size: 18px;
    color: var(--white);
    background-color: rgba(31, 32, 36, 0.4);
    margin: 4px 0 18px;
    padding: 6px 8px;
    border-radius: 6px;
    width: 100%;

    &:hover {
      color: var(--white);
      background-color: rgb(41, 40, 35);
    }

    &:focus>option:checked {
      color: var(--black);
      background: var(--orange);
      /* selected */
    }
  }

  input {
    font-size: 18px;
    color: var(--white);
    background-color: rgba(31, 32, 36, 0.4);
    margin: 4px 0 18px;
    padding: 6px 8px;
    border-radius: 6px;
    width: 200px;
    border: 1px solid rgba(170, 170, 170, 0.5);
  }

`;