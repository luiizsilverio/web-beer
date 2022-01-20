import Image from 'next/image'
import { Beer } from '@styled-icons/ionicons-solid/Beer'

import * as S from './styles'
import InputBox from '@/components/InputBox'
import { MyButton } from '@/components/MyButton'

function SignIn() {
  return (
    <S.Container>
      <S.Content>
        <S.Title>
          <Beer size={120} color='#ff872c'/>
          <h1>My-Beer</h1>
        </S.Title>
        <S.Form>
          <InputBox 
            label='Senha Administrador'
            type="password" 
            maxLength={10} 
          />
          <MyButton
            type="button"
          >
            Acessar
          </MyButton>
        </S.Form>
      </S.Content>
    </S.Container>
  )
}

export default SignIn;
