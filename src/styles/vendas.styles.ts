import styled from 'styled-components'

export const Container = styled.main`
  grid-area: princ;
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  /* flex: 1; */
  background-color: #eeeeee;
  box-shadow: 1px 1px 6px 4px rgba(0, 0, 0, .2);
  padding: 8px;
  color: var(--black);
  font-size: 12px;
  overflow-x: auto;

  table {
    width: 100%;
  }
  table, th, td {
    border: 1px solid var(--black);
    border-collapse: collapse;
  }
  th, td {
    height: 18px;
  }
  .center {
    text-align: center;
  }
  .nome {
    padding-left: 10px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--brown);
  }

  @media print {
    @page{size: auto;}
    background: transparent;
    /* color: #000; */
    text-shadow: none;
    filter: none;
    -ms-filter: none;
    box-shadow: none;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 50% auto; /* 2 colunas */
`;

export const Form = styled.form`
  display: flex;

  input {
    font-family: Roboto, 'Open Sans', sans-serif;
    font-weight: bold;
    text-align: center;
    background-color: var(--bege);
    border: 1px solid var(--background);
    outline: none;
    width: 120px;
    border-radius: 6px;
    padding: 4px 0;
    margin-left: 10px;
  }
`;