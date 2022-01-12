import { InputHTMLAttributes } from 'react'

import * as S from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

const InputBox = ({label, ...rest }: InputProps) => {
  return (
    <S.Container>
      <label htmlFor='inputbox'>{ label }</label>
      <S.InputContainer>
        <input {...rest} className='inputbox' />
      </S.InputContainer>
    </S.Container>
  )
}

export default InputBox