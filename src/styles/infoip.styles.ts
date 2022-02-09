import styled from 'styled-components'
import { animacao_balanca, animacao_crescer } from '@/styles/keyframes';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;  

  background-image: url('./bg-beer-2.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* filter: blur(4px); */

  position: absolute;
  top: 0;
  left: 0;
  z-index: 88;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 42rem;
  height: 38rem;  
  max-width: 80%;  

  background-color: var(--background);
  border-radius: 20px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.5);
  color: var(--white);
  padding: 20px;

  animation: ${animacao_crescer} 0.2s linear;

  p {
    font-size: 1.6rem;
    color: var(--text-light);
  }
`;

export const Title = styled.header`
  height: 14rem;  
  display: flex;
  align-items: center;
  justify-content: center;
  
  h1 {
    border-top: 1px solid var(--orange);
    border-bottom: 1px solid var(--orange);
    color: var(--bege); //var(--white);
    font-size: 4.5rem;
    font-weight: 100;
    line-height: 7.3rem;
  }

 svg {
    margin-right: 1rem;
    animation: ${ animacao_balanca } 0.7s ease-in-out;

    &:hover {
      animation: ${ animacao_balanca } 0.5s infinite;
    }
  }  

  @media(max-width: 460px) {
    h1 {
      font-size: 3.2rem;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 2rem 0;

  @media(max-width: 460px) {
    width: 80%;
  }
`;
