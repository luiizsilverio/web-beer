import styled,{ css } from 'styled-components'
import { animacao_crescer } from '@/styles/keyframes';

export const Container = styled.div`
  margin-bottom: 1.4rem;

  &:not(:last-child) {
    margin-right: 1.5rem;
  }
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
`;

export const Title = styled.div`
  display: flex;
  height: 3.1rem;
  align-items: flex-start;
  justify-content: space-between;
  color: var(--white);
  /* font-family: 'Open Sans'; */
  font-size: 1.3rem;
  
  h2 {
    font-weight: lighter; //400;
    color: var(--white);
    text-shadow: 1px 1px 4px rgba(0, 0, 0, .3);
  }
`;
