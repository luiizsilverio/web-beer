import styled from 'styled-components'

export const Container = styled.header`
  grid-area: main;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: var(--background);
  font-family: Roboto;
  
  /* height: 60px; */
  height: ${ props => process.env.NEXT_PUBLIC_HEADER_HEIGHT }px;
  width: calc(100% - ${ props => process.env.NEXT_PUBLIC_ASIDE_WIDTH }px); /* subtrai a largura do menu */
  
  position: fixed;
  top: 0;
  
  h1 {
    font-size: 2.4rem;     
    font-weight: 500;
    color: var(--bege); //var(--white);
  }

  @media(max-width: 740px) {
	  width: 100%;
	}
`;

