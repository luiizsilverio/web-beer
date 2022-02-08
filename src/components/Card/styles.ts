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
  padding-right: 4px;
  position: relative;

  /* background-color: var(--back_light);
  filter: opacity(50%); */
  
  /* background-color: rgba(82, 102, 122, .6);  */
  background-color: rgba(49, 61, 73, .6);   

  animation: ${ animacao_crescer } 0.4s;

  @media(max-width: 900px) {
	  width: auto;
	}
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  color: var(--white);
  /* font-family: 'Open Sans'; */
  font-size: 1.2rem;
  line-height: 1.8;  
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;

  h2 {
    font-weight: lighter; //400;
    color: var(--white);
    text-shadow: 1px 1px 4px rgba(0, 0, 0, .8);
  }

  @media(max-width: 460px) {
	  font-size: 1.1rem;
    line-height: 2;      

    h2 {
      font-weight: normal;
    }
	}
`;

export const RealBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 22px;
  border-radius: 6px;
  padding-top: 2px;
  font-size: 14px;
  font-weight: bold;  
  background-color: var(--bege); 
  color: var(--abacate);
`;
