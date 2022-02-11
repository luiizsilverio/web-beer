import styled from "styled-components";

type Props = {
  height?: number
}

const header_height = process.env.NEXT_PUBLIC_HEADER_HEIGHT || 50

export const Container = styled.div`
  grid-area: princ;

  /* margin-top: 60px; */
  margin-top: ${ props => header_height }px;

  height: calc(100vh - ${ props => header_height }px);

  color: var(--white);
  /* padding: 12px; */
  overflow-y: auto; //scroll;  

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
`;
