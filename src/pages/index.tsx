import { useEffect } from 'react'
// import decode from 'jwt-decode'
import Nookies, { setCookie, parseCookies } from 'nookies'
import CryptoJS from 'crypto-js'

import SignIn from './signin'
import Dashboard from './dashboard'
import { useBeerContext } from '@/contexts'

interface Props {
  senha: string
}

export default function Home(props: Props) {
  // const { senha, checaAdmin, isAdmin } = useBeerContext()

  // useEffect(() => {
  //   async function inic() {
  //     if (props.senha) {
  //       await checaAdmin(props.senha);
        
  //     }
  //   }
  //   inic()  
  // }, [])

  return (
    <>
      <Dashboard />
      {/* { 
        isAdmin ? <Dashboard /> : <SignIn />
      } */}
    </>
  )
}

export async function getServerSideProps(context) {
//   const cookies = Nookies.get(context)
//   let senha = Nookies['My-Beer:senha']
//   console.log('senha**', senha)

//   // let senha: string = passw ? decode(passw) : ''

//   if (senha) {
//     const bytes  = CryptoJS.AES.decrypt(senha, process.env.NEXT_PUBLIC_API_SECRET);
//     senha = bytes.toString(CryptoJS.enc.Utf8);    
//     console.log('senha***', senha)
//   }

const senha = 'OI***';
console.log(senha)

  return {
    props: {
      senha
    }
  }
}