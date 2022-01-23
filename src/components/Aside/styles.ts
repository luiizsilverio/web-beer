import styled, { css } from 'styled-components'
import { 
  animacao_balanca, 
  animacao_subir, 
  animacao_para_direita
} from '@/styles/keyframes';

type Props = {
  menuOpen: boolean
}

export const Container = styled.aside<Props>`
  grid-area: menu;
  background-color: var(--background);
  color: var(--white);
  position: relative;
  background-image: linear-gradient(to bottom right, 
    var(--background), var(--back_light));
      
  @media(max-width: 740px) {
    /* display: ${props => props.menuOpen ? "initial" : "none" };     */
    position: absolute;
    z-index: 50;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 4px 4px 15px 6px rgba(0, 0, 0, .2);

    ${ props => props.menuOpen && css`
      animation: ${animacao_para_direita} 1s;
      display: initial;
    `};

    ${ props => !props.menuOpen && css`
      display: none;
    `};
  }

  @media(min-width: 741px) {
    clip-path: polygon(0 0, 100% 0, 100% 77%, 0 100%, 0% 50%);
    border-right: 1px solid var(--brown); // #bb844c;
  }
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
  width: 8.2rem;
  flex-direction: column;
  border-top: 1px solid var(--orange);
  border-bottom: 1px solid var(--orange);

  
  h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 2rem;
    color: var(--white);
    line-height: 4.2rem;

    /* &::after {      
      content: "";
      display: inline-block;
      height: 3px;
      width: 72px;
      border-bottom: 1px solid var(--orange);      
    } */
  }

`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 2.5rem;
  font-size: 1.6rem;  
  animation: ${ animacao_subir } 0.4s ease-out;  
  max-width: 30rem;
`;

export const MenuLink = styled.a`
  text-decoration: none;
  color: var(--text-light);
  font-size: 1.6rem;
  margin: 4px 0;
  padding: 2px 0;
  cursor: pointer;

  /* text-align: left;
  background-color: transparent;
  border: none; */

  &:last-child {
    margin-bottom: 40px;
  }

  svg {
    margin-right: 6px;

    &:hover {
      font-size: 32px;
    }
  }

  &:hover, &:active {
    background-color: var(--orange);
    color: var(--black);
    border-radius: 4px;
  }
`;

export const Button = styled.div`
  position: absolute;
  right: 7rem;
  top: 2rem;
`;
