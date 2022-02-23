import styled, { css } from 'styled-components'

type Props = {
  fechou: boolean
}

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  background-color: rgba(86, 99, 115, 0.3);

  margin: 4px 4px 8px;
  border-radius: 4px;
  padding: 4px 8px;
  gap: 10px;

  .controls {
    display: flex;
    align-items: center;
    gap: 4px;

    button {
      width: 32px;
      height: 32px;
      background-color: transparent;
      color: var(--bege2);
      border: none;
      padding: 4px;
      transition: .2s;

      &:hover {
        background-color: rgba(131, 140, 125, 0.3);
        color: var(--orange);
        transform: scale(1.1);
      }

      &:active {
        color: var(--orange);
        transform: scale(0.95);
      }
    }
  }

  .info {
    flex-direction: column;
    line-height: 1.4;

    h1, h2, h3 {
      color: var(--white);
      font-size: 16px;
      font-weight: normal;
      ${props => props.fechou && css`
        text-decoration: line-through;
      `}
    }

    span {
      color: var(--white);
      font-size: 16px;
      font-weight: lighter;
      ${props => props.fechou && css`
        text-decoration: line-through;
      `}

      &::before {
        display: inline-block;
        content: "";
        width: 10px;
      }
    }

    p {
      color: rgb(250, 238, 225);
      font-size: 14px;
    }
  }

`;
