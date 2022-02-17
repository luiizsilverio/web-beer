import { useState } from 'react';
import { useRouter } from 'next/router';

import * as S from '@/styles/fechar.styles'
import { IComanda, IConsumo, IMesa } from '@/dtos'
import strzero from '@/utils/strzero'
import Header from '@/components/Header'


export default function Fechar() {
  const [comanda, setComanda] = useState<IComanda>({} as IComanda)
  const [consumos, setConsumos] = useState<IConsumo[]>([])
  const [consumo, setConsumo] = useState<IConsumo>({} as IConsumo)
  const [id_comanda, setId_comanda] = useState("")
  const [newConta, setNewConta] = useState(false)
  const router = useRouter()
  const mesa = strzero(router.query.mesa, 2) || "";

  return (
    <>
      <Header title={`MESA Nº ${ mesa }`} />
      <S.Container>
        <S.Content>

        </S.Content>
      </S.Container>
    </>
  )
}