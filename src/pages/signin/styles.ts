import styled from 'styled-components'

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
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;

  background-color: var(--background);
  border-radius: 15px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.5);
  color: #c1c1c1;
`;
