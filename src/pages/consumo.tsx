import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Router, useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeftShort } from '@styled-icons/bootstrap';
import { Beer } from '@styled-icons/ionicons-solid/Beer'

import * as S from '@/styles/consumo.styles'
import { useBeerContext } from '@/contexts';
import { IConsumo } from '@/dtos';
import Header from '@/components/Header'
import RoundButton from '@/components/RoundButton'
import { MyButton } from '@/components/MyButton';

const options = [
  { value: '1', label: 'Chocolate' },
  { value: '2', label: 'Strawberry' },
  { value: '3', label: 'Vanilla' }
]


export default function Consumo() {
  const app = useBeerContext()
  const router = useRouter()
  const [id, setId] = useState(router.query?.id || "")
  const [id_product, setId_product] = useState(router.query.id_product || "")
  const [complemento, setComplemento] = useState(router.query.complemento || "")
  const [quant, setQuant] = useState(router.query?.qtd || 1)
  const [total, setTotal] = useState(router.query?.vl_total || 0)
  const [vlun, setVlun] = useState(router.query?.vl_unit || 0)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    //...
  }

  useEffect(() => {
    async function inic() {
      if (app.products.length === 0) {
        await app.loadProducts()
      }
      if (app.complementos.length === 0) {
        await app.loadComplementos()
      }
    }

    inic()
  }, [])

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
          <S.FormContainer>
            <Beer size={300} />
          <S.Form onSubmit={handleSubmit}>
            <label htmlFor='product'>Descrição do produto</label>
            <select
              value={id_product}
              onChange={(e) => setId_product(e.target.value)}
              id="product"
            >
              {
                app.products.map((item) => (
                  <option value={item.id}>
                    {item.name}
                  </option>
                ))
              }
            </select>

            <label htmlFor='complemento'>Complemento (opcional)</label>
            <select
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              id="complemento"
            >
              {
                app.complementos.map((item) => (
                  <option value={item.name}>
                    {item.name}
                  </option>
                ))
              }
            </select>

            <label htmlFor="qtd">Quantidade</label>
            <input
              type="number" min="0" max="100"
              id="qtd"
            />

            <label htmlFor="vlun">Valor Unitário R$</label>
            <input
              type="number"
              id="vlun"
              step='0.01' placeholder='0.00'
              readOnly
            />

            <label htmlFor="vtot">Valor Total R$</label>
            <input
              type="number"
              id="vtot"
              step='0.01' placeholder='0.00'
              readOnly
            />

          </S.Form>
          </S.FormContainer>

          <footer>
            <MyButton type="submit">Confirma</MyButton>
            <div className="totaldiv">
              <span>Total</span>
              <h2>R$ 0.00</h2>
            </div>
          </footer>

        </S.Content>
      </S.Container>

      <Toaster />
    </>
  )
}