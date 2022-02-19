import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import * as S from '@/styles/fechar.styles'
import { IComanda, IConsumo, IMesa } from '@/dtos'
import strzero from '@/utils/strzero'
import Header from '@/components/Header'
import FecharCard from '@/components/FecharCard'

const lista: IConsumo[] = [
  {
    id: '1',
    id_comanda: '1',
    id_product: '1',
    name: "Cerveja",
    qtd: 1,
    vl_unit: 7,
    vl_total: 7,
    fechou: true
  },
  {
    id: '2',
    id_comanda: '1',
    id_product: '2',
    name: "Amendoim",
    qtd: 1,
    vl_unit: 5,
    vl_total: 5,
    fechou: false
  },
]

export default function Fechar() {
  const [comanda, setComanda] = useState<IComanda>({} as IComanda)
  const [consumos, setConsumos] = useState<IConsumo[]>(lista)
  const [consumo, setConsumo] = useState<IConsumo>({} as IConsumo)
  const [id_comanda, setId_comanda] = useState("")
  const [newConta, setNewConta] = useState(false)

  const router = useRouter()
  const mesa = strzero(router.query.mesa, 2) || "";

  const total = useMemo(() => consumos.reduce((acc, item) => {
    return acc + item.vl_total
  }, 0), [consumos])

  return (
    <>
      <Header title={`MESA Nº ${ mesa }`} />
      <S.Container>
        <S.Content>
          <ul>
            {
              consumos.map((item) => (
                <li key={item.id}>
                  <FecharCard />
                </li>
              ))
            }
          </ul>
          <footer>
            <span>Total</span>
            <h2>R$ { total.toFixed(2) }</h2>
          </footer>
        </S.Content>
      </S.Container>
    </>
  )
}