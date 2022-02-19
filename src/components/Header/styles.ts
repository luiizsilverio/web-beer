import styled from 'styled-components'

const aside_width = process.env.NEXT_PUBLIC_ASIDE_WIDTH || 210
const header_height = process.env.NEXT_PUBLIC_HEADER_HEIGHT || 50

export const Container = styled.header`
  grid-area: main;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: var(--background);
  font-family: Roboto;

  /* height: 60px; */
  height: ${ props => header_height }px;
  width: calc(100% - ${ props => aside_width }px); /* subtrai a largura do menu */

  position: fixed;
  top: 0;

  h1 {
    font-size: 2.4rem;
    font-weight: 500;
    color: var(--bege); //var(--white);
  }

  @media(max-width: 740px) {
	  width: 100%;
    padding-left: 60px;
	}

`;

