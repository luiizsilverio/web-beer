import styled,{ css } from 'styled-components'
import { animacao_crescer } from '@/styles/keyframes';

export const Container = styled.div`
  margin-bottom: 1.6rem;  
`;

type CardProps = {
  heightPx: number
  widthPx: number
}

export const Content = styled.div<CardProps>`
  display: flex;
  
  ${ props => props.widthPx > 0 && css`
    width: ${ props.widthPx }px;
  `};

  height: ${ props => props.heightPx }px; //19rem;
  border-radius: 1.6rem;
  padding: 2px 8px;
  position: relative;

  /* background-color: var(--back_light);
  filter: opacity(50%); */
  
  background-color: rgba(50, 50, 50, .6); 
  
  animation: ${ animacao_crescer } 0.4s;

  @media(max-width: 900px) {
	  width: auto;
	}
`;

export const Title = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  color: var(--white);
  /* font-family: 'Open Sans'; */
  font-size: 1.3rem;
  line-height: 1.8;
  
  h2 {
    font-weight: lighter; //400;
    color: var(--white);
    text-shadow: 1px 1px 4px rgba(0, 0, 0, .4);
  }

  @media(max-width: 460px) {
	  font-size: 1.1rem;
    line-height: 2;      

    h2 {
      font-weight: normal;
    }
	}
`;
