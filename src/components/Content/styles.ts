import styled from "styled-components";

export const Container = styled.main`
  grid-area: princ;

  margin-top: 60px;
  height: calc(100vh - 60px);

  color: var(--white);
  /* padding: 12px; */
  overflow-y: scroll;  

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--text-light);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--brown);
  }

`;
