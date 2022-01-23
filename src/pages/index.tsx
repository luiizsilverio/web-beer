import { useEffect } from 'react'
import decode from 'jwt-decode'
import Cookies from 'js-cookie'
import { hash } from 'bcryptjs'

import SignIn from './signin'
import Dashboard from './dashboard'
import { useBeerContext } from '@/contexts'

interface Props {
  senha: string
}

export default function Home(props: Props) {
  const { senha, checaAdmin, isAdmin } = useBeerContext()

  useEffect(() => {
    async function inic() {
      if (props.senha) {
        await checaAdmin(props.senha);
        if (isAdmin) {
          Cookies.set('My-Beer:senha', senha)
        }
      }
    }

    inic()  
  }, [])

  return (
    <>
      {/* <Dashboard /> */}
      { 
        isAdmin ? <Dashboard /> : <SignIn />
      }
    </>
  )
}

export async function getServerSideProps(context) {
  const passw = Cookies.get('My-Beer:senha')
  let senha: string = passw ? decode(passw) : ''

  if (senha) {
    senha = await hash(senha, 8); //criptografa
  }

  return {
    props: {
      senha
    }
  }
}