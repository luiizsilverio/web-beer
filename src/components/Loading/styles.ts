import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: blue;    
  position: relative;

  img {
    position: absolute;
    background: red;
    top: 50%;
    z-index: 55;
  }
`;


