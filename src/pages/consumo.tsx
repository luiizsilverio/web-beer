import { useEffect, useMemo, useState } from 'react';
import { Router, useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeftShort } from '@styled-icons/bootstrap';

import * as S from '@/styles/consumo.styles'
import { useBeerContext } from '@/contexts';
import { IConsumo } from '@/dtos';
import Header from '@/components/Header'
import RoundButton from '@/components/RoundButton'

interface RouterProps {
  id: string
  id_comanda: string
  numMesa: string
}

export default function Consumo() {
  const app = useBeerContext()
  const router = useRouter()
  const [id, setId] = useState(router.query?.id || "")
  const [id_product, setId_product] = useState(router.query?.id_product || "")
  const [complemento, setComplemento] = useState(router.query?.complemento || "")
  const [quant, setQuant] = useState(router.query?.qtd || 1)
  const [total, setTotal] = useState(router.query?.vl_total || 0)
  const [vlun, setVlun] = useState(router.query?.vl_unit || 0)

  return (
    <>
      <Header title={`CONSUMO DA MESA Nº ${ router.query?.numMesa }`}>
        <S.ControlBox>
          <RoundButton color="#BA55D3" onClick={() => router.back()}>
            <ArrowLeftShort size={36} title="Voltar" />
          </RoundButton>
        </S.ControlBox>
      </Header>

      <S.Container>
        <S.Content>

          <footer>
            <span>Total</span>
            <h2>R$ 0.00</h2>
          </footer>
        </S.Content>
      </S.Container>

      <Toaster />
    </>
  )
}