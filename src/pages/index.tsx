import { GetStaticPathsContext, GetStaticProps, GetStaticPropsContext, NextPageContext } from 'next'
import { useEffect } from 'react'
import { verify } from 'jsonwebtoken'
import Nookies from 'nookies'
import CryptoJS from 'crypto-js'

import SignIn from './signin'
import Dashboard from './dashboard'
import { useBeerContext } from '@/contexts'

interface Props {
  senha: string
}

export default function Home(props: Props) {
  const { isAdmin, checaAdmin } = useBeerContext()

  useEffect(() => {
    const cookies = Nookies.get()
    let token = cookies['MyBeer:token']
    let senha = cookies['MyBeer:senha']

    // verifica se a senha do cookie é a senha Admin
    async function inicUser() {
      if (senha) {
        await checaAdmin(senha)
      }    
    }

    //inicUser()
  }, [])

  return (
    <>      
      { 
        isAdmin ? <Dashboard /> : <SignIn />
      }       
    </>
  )
}

// export async function getServerSideProps(context) {
//   const cookies = Nookies.get(context)
//   let token = cookies['MyBeer:token']
//   let senha = cookies['MyBeer:senha']

//   // se não existir o cookie de senha ou de token, vai para a tela de login
//   if (!senha || !token) {
//     return {
//       redirect: {
//         destination: '/signin',
//         permanent: false,
//       }
//     }
//   }

//   // verifica se o token é válido ou se não expirou
//   try {
//     verify(token as string, process.env.NEXT_PUBLIC_API_SECRET)
//   }
//   catch(err) {
//     console.log('**', err?.message) // jwt expired
//     token = ''
//   }
  
//   // se o token for inválido ou expirou, vai para a tela de login
//   if (!token) {
//     return {
//       redirect: {
//         destination: '/signin',
//         permanent: false,
//       }
//     }
//   }

//   // descriptografa a senha do cookie
//   try {
//     const bytes = CryptoJS.AES.decrypt(senha, process.env.NEXT_PUBLIC_API_SECRET);
//     senha = bytes.toString(CryptoJS.enc.Utf8);    
//   }
//   catch(err) {
//     console.log('**', err) // invalid signature
//     senha = ''
//   }  

//   // envia a senha descriptografada para a Home
//   return {
//     props: { senha }
//   }
// }