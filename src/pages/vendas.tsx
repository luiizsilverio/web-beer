import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Nookies from 'nookies'
import CryptoJS from 'crypto-js'

import * as S from '@/styles/vendas.styles'
import { useBeerContext } from '@/contexts';
import Header from '@/components/Header'

export default function Vendas() {
  const { isAdmin, checaAdmin, senha, logout } = useBeerContext()
  const router = useRouter()

  useEffect(() => {
    async function inicUser() {
      let mySenha = senha

      if (!isAdmin) {
        // busca a senha dos cookies
        const cookies = Nookies.get(null)
        mySenha = cookies['MyBeer:senha']

        if (mySenha) {
          // descriptografa a senha do cookie
          const bytes  = CryptoJS.AES.decrypt(mySenha, process.env.NEXT_PUBLIC_API_SECRET);
          mySenha = bytes.toString(CryptoJS.enc.Utf8);
        }
      }

      // verifica se a senha do cookie é a senha Admin
      if (!mySenha) {
        logout()
        return false
      }
      else {
        return await checaAdmin(mySenha)
      }
    }

    inicUser()
      .then((response) => {
        if (!response) {
          router.push('/signin')
        }
      })
  }, [])


  return (
    <>
      <Header title="Relatório de Vendas" />
      <S.Main>

      </S.Main>
    </>
  )
}