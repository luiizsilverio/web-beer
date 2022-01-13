import styled from 'styled-components'
import { animacao_balanca, animacao_subir } from '@/styles/keyframes';

export const Container = styled.aside`
  grid-area: menu;
  background-color: var(--background);
  border-right: 1px solid var(--brown); // #bb844c;
  color: var(--white);

`;

export const TitleContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  margin-bottom: 20px;

  svg {
    margin-right: 12px;
    animation: ${ animacao_balanca } 0.3s ease-in-out;
  }  
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 2.2rem;
    color: var(--white);

    &::after {      
      content: "";
      display: block;
      height: 3px;
      width: 70px;
      border-bottom: 1px solid var(--orange);      
    }
  }
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 2.5rem;
  font-size: 1.6rem;  
  animation: ${ animacao_subir } 0.4s ease-out;
  
  li {
    margin-bottom: 6px;

    &:hover {
      transform: scale(1.04);
      color: red;
    }
  }
`;

export const MenuLink = styled.a`
  text-decoration: none;
  color: var(--text-light);
  font-size: 1.6rem;
  margin: 4px 0;
  transition: all 0.1s;

  svg {
    margin-right: 6px;

    &:hover {
      font-size: 32px;
    }
  }

  &:hover, &:active {
    background-color: var(--orange);
    color: var(--back_black);
    border-radius: 4px;
  }

`;
