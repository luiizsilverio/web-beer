import Image from 'next/image'
import * as S from './styles'
import { Beer } from '@styled-icons/ionicons-solid/Beer'

function SignIn() {
  return (
    <S.Container>
      <S.Content>
        <Beer size={120} color='#ff872c'/>
        <h1>Web-Beer</h1>
      </S.Content>
    </S.Container>
  )
}

export default SignIn;
