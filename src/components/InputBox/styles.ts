import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  
  label {
    font-size: 1.5rem;
    margin-bottom: 6px;
    color: var(--text-light);
  }
`;

export const InputContainer = styled.div`
  background-color: #18191c;
  border: 1px solid var(--text-light);
  border-radius: 10px;
  padding: 4px 8px;

  input {
    font-size: 2.7rem;
    font-family: Roboto, 'Sans Serif', sans-serif;
    outline: none;
    background-color: #18191c;
    border: none;
    color: var(--text-white);
    text-align: center;     
    width: 100%;     
      
    &::placeholder {
      font-size: 1.6rem;                    
    }
  }

  &:focus-within {
    border: 1px solid var(--orange);
    }
`;