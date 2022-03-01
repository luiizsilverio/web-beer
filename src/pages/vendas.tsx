import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Nookies from 'nookies'
import CryptoJS from 'crypto-js'
import { subDays } from 'date-fns';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';

import * as S from '@/styles/vendas.styles'
import { useBeerContext } from '@/contexts';
import api, { apiConfig } from '@/services/api';
import Header from '@/components/Header'
import strzero from '@/utils/strzero'

type TLista = {
  id_product: string
  name: string
  qtd: number
  vl_total: number
}

registerLocale('pt', pt)

export default function Vendas() {
  const { isAdmin, checaAdmin, senha, logout } = useBeerContext()
  const router = useRouter()
  const [lista, setLista] = useState<TLista[]>([])
  const [totQtd, setTotQtd] = useState(0.0)
  const [totVal, setTotVal] = useState(0.0)
  const [dtIni, setDtIni] = useState<Date>(new Date())
  const [dtFim, setDtFim] = useState<Date>(new Date())

  async function buscaDados(dt1, dt2: Date) {
    try {
      const response = await api.get('estatistica/top5/produtos', {
        params: {
          dtInicial: dt1.toISOString(),
          dtFinal: dt2.toISOString(),
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
      .sort(function(a, b) {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      })

      setLista(vendas)
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
      })
  }, [])


  useEffect(() => {
    buscaDados(dtIni, dtFim)
  }, [dtIni, dtFim])


  return (
    <>
      <Header title="Vendas">
        <S.Form>
          <DatePicker
            className="date-picker"
            selected={dtIni}
            onChange={(date) => setDtIni(date)}
            dateFormat="dd/MM/yyyy"
            locale="pt"
          />
          <DatePicker
            className="date-picker"
            selected={dtFim}
            onChange={(date) => setDtFim(date)}
            dateFormat="dd/MM/yyyy"
            locale="pt"
          />
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
                  <td className="nome">{ item.name }</td>
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
