import styled from 'styled-components'

export const Main = styled.main`
  grid-area: princ;
  display: flex;  
  flex-direction: column;
  padding: 20px;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 40% auto; 
  column-gap: 1.5rem;  

  @media(max-width: 900px) {
	  display: inline-block;
    width: 100%;     
	}
`;

export const ChartContainer = styled.div`
  display: flex;
  flex: 1;  
  /* background-color: red; */

`;

export const TotalContainer = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  align-items: center;

  width: 100%;
  padding-left: 20px;
  padding-top: 40px;
  position: relative;
  /* background-color: red; */
  overflow: hidden;
  
  span {
    font-size: 1.6rem;
    color: var(--text-light);
    font-weight: lighter;
  }

  h1 {
    font-size: 2.4rem;
    color: var(--bege); //var(--white);
  }

  svg {
    position: absolute;
    z-index: 7;
    right: -50px;
    top: -42px;
    color: rgba(127, 255, 212, 0.1); 
  }

  @media(max-width: 1064px) {
    grid-template-columns: 120px 1fr;
    padding-left: 10px;
    
    span {
      font-size: 1.4rem;
    }
	  h1 {
      font-size: 2rem;
	  }
  }

  @media(max-width: 900px) {
    grid-template-columns: 140px 1fr;
    padding-left: 20px;

    span {
      font-size: 1.6rem;
    }
	  h1 {
      font-size: 2.4rem;
	  }
	}
`;

export const TotalLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-gap: 4px;

  margin-right: 10px;
  font-size: 1.6rem;
  color: var(--text-light);
  font-weight: lighter;
`;

export const TotalValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 0;

  font-size: 2.4rem;
  color: var(--white);
`;

export const LegendContainer = styled.ul`
  width: 200px;
  list-style: none;
  padding: 12px 8px;
  padding-right: 5px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--brown); //var(--text-light);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent; //var(--brown);
  }
`;

interface ILegendProps {
  color: string
}

export const Legend = styled.li<ILegendProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  overflow-x: hidden;

  > div {
    background-color: ${props => props.color};
    width: 55px;
    min-width: 55px;
    height: 24px;
    border-radius: 8px;
    font-size: 1.4rem;
    line-height: 24px;
    text-align: center;
    margin: 4px 6px 3px 0;    
    /* box-shadow: 1px 1px 2px rgba(50, 50, 50, .6); */
  }

  > span {
    font-size: 1.2rem;
    font-weight: lighter;
    white-space: nowrap;
  }
`;

export const SelectContainer = styled.div`
  div {
    position: absolute;
    top: -3.1rem;
    filter: opacity(0.8);

    &:first-child {
      right: 9.8rem;
      /* left: 18.6rem; */
    }

    &:last-child {
      right: 0;
    }
  }
`;

