import { useState } from 'react'
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { Beer } from '@styled-icons/ionicons-solid/Beer'
import { setCookie } from 'nookies'
import { sign } from 'jsonwebtoken'
import CryptoJS from 'crypto-js'

import * as S from '@/styles/signin.styles'
import { useBeerContext } from '@/contexts'
import { apiConfig } from '@/services/api';
import InputBox from '@/components/InputBox'
import { MyButton } from '@/components/MyButton'

function SignIn() {
  const [mySenha, setMySenha] = useState('')
  const { checaAdmin } = useBeerContext()
  const router = useRouter()

  async function handleSignIn() {
    const senhaOk = await checaAdmin(mySenha)

    // destroyCookie(null, 'MyBeer:senha')

    if (!senhaOk && !apiConfig.ok) {
      router.push('/infoip')
      return
    }

    if (!senhaOk) {
      toast.error('Senha incorreta.', {
        duration: 4000,
        position: 'top-center',
        style: {fontSize: 18}
      })
      return
    }

    // cria um Token JWT que expira em 8h
    const token = sign({},
      process.env.NEXT_PUBLIC_API_SECRET, {
        subject: 'beer',
        expiresIn: '8h'
      }
    )

    // criptografa a senha, antes de salvar nos Cookies
    const senhaCriptografada = CryptoJS.AES.encrypt(
      mySenha,
      process.env.NEXT_PUBLIC_API_SECRET
    ).toString();

    // salva o token e a senha criptografada nos cookies
    setCookie(null, 'MyBeer:token', token)
    setCookie(null, 'MyBeer:senha', senhaCriptografada)

    router.push('/')
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
