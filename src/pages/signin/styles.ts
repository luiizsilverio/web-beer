import styled, {keyframes} from 'styled-components'

const crescer = keyframes`
  from {
    transform: scale(.95);
    opacity: 0.8;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

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
  flex-direction: column;
  align-items: center;
  width: 42rem;
  height: 38rem;  

  background-color: var(--background);
  border-radius: 20px;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.5);
  color: var(--white);
  padding: 20px;

  animation: ${crescer} 0.2s linear;

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
    font-size: 5rem;
    font-weight: 100;
  }

 svg {
    margin-right: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 2rem 0;
`;
