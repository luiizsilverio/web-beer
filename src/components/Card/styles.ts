import styled from 'styled-components'
import { animacao_crescer } from '@/styles/keyframes';

export const Container = styled.div`
  margin-bottom: 1.5rem;
  margin-right: 1.5rem;
`;

export const Content = styled.div`
  display: flex;
  height: 18rem;
  border-radius: 2rem;
  background-color: var(--background);
  filter: opacity(40%);
  
  animation: ${ animacao_crescer } 0.4s;
`;

export const Title = styled.div`
  display: flex;
  height: 3.6rem;
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
