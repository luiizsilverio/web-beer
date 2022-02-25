import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Router, useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeftShort } from '@styled-icons/bootstrap';
import { Beer } from '@styled-icons/ionicons-solid/Beer'
import { v4 as uuid } from 'uuid'

import * as S from '@/styles/consumo.styles'
import { useBeerContext } from '@/contexts';
import api from '@/services/api';
import { IConsumo, IComanda } from '@/dtos';

import Header from '@/components/Header'
import RoundButton from '@/components/RoundButton'
import { MyButton } from '@/components/MyButton';
import strzero from '@/utils/strzero';

const options = [
  { value: '1', label: 'Chocolate' },
  { value: '2', label: 'Strawberry' },
  { value: '3', label: 'Vanilla' }
]


export default function Consumo() {
  const app = useBeerContext()
  const router = useRouter()
  const v_qtd = parseInt(router.query?.qtd.toString() || '1')
  const v_unit = parseFloat(router.query?.vl_total.toString() || '0.00')

  const [id, setId] = useState(router.query?.id || "")
  const [id_product, setId_product] = useState(router.query.id_product || "")
  const [complemento, setComplemento] = useState(router.query.complemento || "")

  const [qtd, setQtd] = useState(v_qtd)
  const [vl_total, setVl_total] = useState(v_unit)
  const [vl_unit, setVl_unit] = useState(v_unit * v_qtd)

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

      const prod = app.products.find(item => item.id === id_product)

      if (prod) {
        if (prod.preco !== vl_unit) {
          setVl_unit(prod.preco)
          setVl_total(qtd * vl_unit)
        }
      }
    }

    inic()
  }, [])


  useEffect(() => {
    const prod = app.products.find(item => item.id === id_product)
    if (prod) {
      const vun = prod.preco;
      const tot = vun * qtd;
      setVl_unit(vun)
      setVl_total(tot)
    }
  }, [id_product]);


  useEffect(() => {
    const vun = vl_unit;
    const tot = vun * qtd;
    setVl_total(tot)
  }, [qtd]);


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
                  <option value={ item.id } key={ item.id }>
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
              value={ strzero(qtd,2) }
              onChange={(e) => setQtd(parseInt(e.target.value))}
            />

            <label htmlFor="vlun">Valor Unitário R$</label>
            <input
              type="number"
              id="vl_unit"
              value={ vl_unit.toFixed(2) }
              step='0.01' placeholder='0.00'
              readOnly
            />

            {/* <label htmlFor="vtot">Valor Total R$</label>
            <input
              type="number"
              id="vtot"
              step='0.01' placeholder='0.00'
              readOnly
            /> */}

          </S.Form>
          </S.FormContainer>

          <footer>
            <MyButton type="submit">Confirma</MyButton>
            <div className="totaldiv">
              <span>Total</span>
              <h2>R$ { vl_total.toFixed(2) }</h2>
            </div>
          </footer>

        </S.Content>
      </S.Container>

      <Toaster />
    </>
  )
}