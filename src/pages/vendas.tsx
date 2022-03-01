import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Nookies from 'nookies'
import CryptoJS from 'crypto-js'
import { subDays } from 'date-fns';

import * as S from '@/styles/vendas.styles'
import { useBeerContext } from '@/contexts';
import api, { apiConfig } from '@/services/api';
import Header from '@/components/Header'
import strzero from '@/utils/strzero';

type TLista = {
  id_product: string
  name: string
  qtd: number
  vl_total: number
}

export default function Vendas() {
  const { isAdmin, checaAdmin, senha, logout } = useBeerContext()
  const router = useRouter()
  const [lista, setLista] = useState<TLista[]>([])
  const [totQtd, setTotQtd] = useState(0.0)
  const [totVal, setTotVal] = useState(0.0)

  async function buscaDados(dt1, dt2: string) {

    try {
      const response = await api.get('estatistica/top5/produtos', {
        params: {
          dtInicial: dt1,
          dtFinal: dt2,
          unidade: 'QT',
          limite: 1000
        }
      })

      const qtd = response.data.reduce((acc, item) => (acc + item.qtd), 0)
      const vltot = response.data.reduce((acc, item) => (acc + item.vl_total), 0)

      const vendas = response.data.map(item => ({
        id_product: strzero(item.id_product, 3),
        name: item.name,
        qtd: strzero(item.qtd, 3),
        vl_total: item.vl_total.toFixed(2)
      }))

      setLista( vendas.sort((a, b) => a.name > b.name) )
      setTotQtd(qtd)
      setTotVal(vltot)

    } catch(error) {
      console.log(error.message)
      if (!apiConfig.ok) {
        router.push('/infoip')
      }
    }
  }

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
        else {
          const hoje = new Date()
          const dt2 = hoje.toISOString()
          const dt1 = subDays(hoje, 30).toISOString()
          buscaDados(dt1, dt2)
        }
      })
  }, [])


  return (
    <>
      <Header title="Vendas">
        <S.Form>
          <input type="date" placeholder="Dt.Inicial" />
          <input type="date" placeholder="Dt.Final" />
        </S.Form>
      </Header>

      <S.Container>
        <S.Content>
          <table>
            <tr>
              <th>Código</th>
              <th>Descrição do produto</th>
              <th>Qtd.</th>
              <th>Valor</th>
            </tr>
            {
              lista.map(item => (
                <tr key={ item.id_product }>
                  <td className="center">{ item.id_product }</td>
                  <td>{ item.name }</td>
                  <td className="center">{ item.qtd }</td>
                  <td className="center">{ item.vl_total }</td>
                </tr>
              ))
            }
            <tr>
              <th>TOTAL</th>
              <th />
              <th>{ strzero(totQtd,3) }</th>
              <th>{ totVal.toFixed(2) }</th>
            </tr>
          </table>
        </S.Content>
      </S.Container>
    </>
  )
}