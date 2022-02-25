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
  background-color: rgba(31, 32, 36, 0.94);
  box-shadow: 1px 1px 6px 4px rgba(0, 0, 0, .2);
  padding: 8px;

  animation: ${animacao_crescer} 0.2s linear;

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: rgba(86, 99, 115, 0.4);
    padding: 10px 20px;

    .totaldiv {
      display: flex;
      flex-direction: row;
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

    button {
      width: 200px;
      display: flex;
      justify-content: center;
      font-size: 18px;
      margin: 0;
      padding: 8px;
      outline-color: var(--orange);


      @media(max-width: 490px) {
        width: 150px;
      }
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
  position: relative;

  width: 100%;
  background-color: rgba(86, 99, 115, 0.2);
  padding: 16px 20px;
  overflow-y: auto;

  svg {
    color: var(--orange);
    position: absolute;
    top: calc(50% - 150px);
    right: 10%;
    z-index: 1;
    filter: opacity(10%);
  }

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
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  z-index: 2;

  label {
    color: var(--text-light);
    font-size: 16px;
    font-weight: lighter;
  }

  select {
    color: var(--white);
    background-color: rgba(31, 32, 36, 0.4);
    margin: 4px 0 18px;
    padding: 6px 8px;
    border-radius: 6px;
    width: 100%;

    font-size: 18px;
    font-family: Roboto, 'Open Sans', sans-serif;
    font-weight: lighter;

    option {
      font-weight: lighter;
    }

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
    font-family: Roboto, 'Open Sans', sans-serif;
    font-weight: lighter;
    color: var(--white);
    background-color: rgba(31, 32, 36, 0.4);
    text-align: center;
    margin: 4px 0 18px;
    padding: 6px 8px;
    border-radius: 6px;
    width: 200px;
    border: 1px solid rgba(170, 170, 170, 0.5);
  }
`;