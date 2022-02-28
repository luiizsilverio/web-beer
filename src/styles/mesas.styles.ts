import styled from 'styled-components'

export const Main = styled.main`
  grid-area: princ;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;

  @media (max-width: 460px) {
    padding: 20px 10px;
  }
`;
