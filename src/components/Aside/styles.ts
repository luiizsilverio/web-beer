import styled from 'styled-components'
import { animacao_balanca, animacao_subir } from '@/styles/keyframes';

export const Container = styled.aside`
  grid-area: menu;
  background-color: var(--background);
  border-right: 1px solid var(--brown); // #bb844c;
  color: var(--white);
  background-image: linear-gradient(to bottom right, 
    var(--background), var(--back_light));

  clip-path: polygon(0 0, 100% 0, 100% 77%, 0 100%, 0% 50%);
`;

export const TitleContainer = styled.header`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin-left: 2rem;
  height: 110px;

  svg {
    margin-right: 10px;
    animation: ${ animacao_balanca } 0.7s ease-in-out;
  }  
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  
  h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 2rem;
    color: var(--white);

    &::after {      
      content: "";
      display: block;
      height: 3px;
      width: 72px;
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

`;

export const MenuLink = styled.a`
  text-decoration: none;
  color: var(--text-light);
  font-size: 1.6rem;
  margin: 4px 0;
  padding: 2px 0;
  cursor: pointer;
  /* transition: all 0.2s; */

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
