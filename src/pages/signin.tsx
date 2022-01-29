import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Beer } from '@styled-icons/ionicons-solid/Beer'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import CryptoJS from 'crypto-js'

import * as S from '@/styles/signin.styles'
import { useBeerContext } from '@/contexts'
import InputBox from '@/components/InputBox'
import { MyButton } from '@/components/MyButton'

function SignIn() {
  const [mySenha, setMySenha] = useState('')
  const { checaAdmin } = useBeerContext()

  async function handleSignIn() {
    const senhaOk = await checaAdmin(mySenha)

    destroyCookie(null, 'MyBeer:senha') 

    if (!senhaOk) {
      toast.error('Senha incorreta.', {
        duration: 4000,
        position: 'top-center',
        style: {fontSize: 18}        
      })
      return
    } 

    // criptografa a senha, antes de salvar nos Cookies
    const senhaCriptografada = CryptoJS.AES.encrypt(
      mySenha,
      process.env.NEXT_PUBLIC_API_SECRET
    ).toString();

    // salva a senha criptografada nos cookies
    setCookie(null, 'MyBeer:senha', senhaCriptografada)
  }

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
