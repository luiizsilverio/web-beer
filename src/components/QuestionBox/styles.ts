import styled from 'styled-components'

export const Container = styled.div`
  /* display: flex;
  width: 200px;
  height: 200px; */
  /* background-color: var(--bege2); */
  color: var(--black);
  padding: 8px;
  font-family: Roboto, 'Open Sans', sans-serif;
  border-radius: 10px;
  /* box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, .2); */
  line-height: 1.5;

`;

export const ToastButton = styled.button`
  padding: 8px;
  margin-right: 8px;
  border-radius: 4px;
  border: none;
  color: white;
  width: 90px;
  margin-top: 24px;

  &.sim {
    background: #699fff;
  }

  &.nao {
    background: red;
  }

  &:hover {
    filter: brightness(0.9);
    transform: scale(1.05);
  }
`;
