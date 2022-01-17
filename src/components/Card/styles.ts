import styled from 'styled-components'
import { animacao_crescer } from '@/styles/keyframes';

export const Container = styled.div`
  margin-bottom: 1.5rem;

  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

export const Content = styled.div`
  display: flex;
  height: 18rem;
  border-radius: 1.6rem;
  padding: 8px;

  /* background-color: var(--back_light);
  filter: opacity(50%); */
  
  background-color: rgba(41, 40, 35, .5); 
  
  animation: ${ animacao_crescer } 0.4s;
`;

export const Title = styled.div`
  display: flex;
  height: 3rem;
  align-items: flex-start;
  justify-content: space-between;
  color: var(--white);
  /* font-family: 'Open Sans'; */
  font-size: 1.4rem;
  
  h2 {
    font-weight: 400;
    color: var(--white);
    text-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
  }
`;
