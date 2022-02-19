import styled from 'styled-components'

interface Props {
  color: string
}

export const Button = styled.button<Props>`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background-color: ${props => props.color};
  color: var(--white);
  border: none;

  -webkit-box-shadow: 4px 4px 10px 4px rgba(0,0,0,0.14);
  -moz-box-shadow: 4px 4px 10px 4px rgba(0,0,0,0.14);
  box-shadow: 4px 4px 6px 4px rgba(0, 0, 0, 0.5);

  transition: .2s filter transform;

  &:hover {
    filter: brightness(0.9);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;
