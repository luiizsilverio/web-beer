import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Beer } from '@styled-icons/ionicons-solid/Beer'
import Cookies from 'js-cookie'
import { hash } from 'bcryptjs'

import * as S from './styles'
import { useBeerContext } from '@/contexts'
import InputBox from '@/components/InputBox'
import { MyButton } from '@/components/MyButton'

function SignIn() {
  const [mySenha, setMySenha] = useState('')
  const { checaAdmin } = useBeerContext()

  async function handleSignIn() {
    const senhaOk = await checaAdmin(mySenha)

    if (!senhaOk) {
      toast.error('Senha incorreta.', {
        duration: 4000,
        position: 'top-center',
        style: {fontSize: 18}        
      })
      return
    } 

    const senha = await hash(mySenha, 8); //criptografa
    Cookies.set('My-Beer:senha', senha)
  }

  useEffect(() => {
    checaAdmin("")
  }, [])

  return (
    <S.Container>
      <S.Content>
        <S.Title>
          <Beer size={120} color={"var(--orange)"} /> 
          <h1>My-Beer</h1>
        </S.Title>

        <S.Form>
          <InputBox 
            label='Senha Administrador'
            type="password"
            value={mySenha} 
            onChange={(e) => setMySenha(e.target.value)}
            maxLength={10} 
          />
          <MyButton
            type="button"
            onClick={handleSignIn}
          >
            Acessar
          </MyButton>

          <Toaster />
        </S.Form>

      </S.Content>
    </S.Container>
  )
}

export default SignIn;
