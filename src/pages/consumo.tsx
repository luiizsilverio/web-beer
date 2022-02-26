import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Router, useRouter } from 'next/router';
import toast, { Toast, Toaster } from 'react-hot-toast';
import { ArrowLeftShort } from '@styled-icons/bootstrap';
import { Beer } from '@styled-icons/ionicons-solid/Beer'
import { v4 as uuid } from 'uuid'

import * as S from '@/styles/consumo.styles'
import { useBeerContext } from '@/contexts';
import { IConsumo, IComanda } from '@/dtos';
import strzero from '@/utils/strzero';
import api from '@/services/api';

import Header from '@/components/Header'
import RoundButton from '@/components/RoundButton'
import { MyButton } from '@/components/MyButton';
import QuestionBox from '@/components/QuestionBox';
import { Loading } from '@/components/Loading';

const options = [
  { value: '1', label: 'Chocolate' },
  { value: '2', label: 'Strawberry' },
  { value: '3', label: 'Vanilla' }
]


export default function Consumo() {
  const app = useBeerContext()
  const router = useRouter()
  const v_qtd = parseInt(router.query?.qtd?.toString() || '1')
  const v_unit = parseFloat(router.query?.vl_unit?.toString() || '0.00')
  const v_prod = router.query?.id_product?.toString() || ""
  const v_comp = router.query?.complemento?.toString() || ""
  const id_comanda = router.query?.id_comanda?.toString() || ""
  const numMesa = parseInt(router.query?.numMesa?.toString() || "0")
  const id = router.query?.id?.toString() || ""

  const [id_product, setId_product] = useState(v_prod)
  const [complemento, setComplemento] = useState(v_comp)
  const [qtd, setQtd] = useState(v_qtd)
  const [vl_total, setVl_total] = useState(v_unit)
  const [vl_unit, setVl_unit] = useState(v_unit * v_qtd)
  const [loading, setLoading] = useState(false)

  const novo = (!router.query || !router.query?.id)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (id_product === "") {
      toast.error("Informe o produto", {
        style: {fontSize: 18}
      })
      return
    }
    if (qtd <= 0) {
      toast.error("Informe a quantidade", {
        style: {fontSize: 18}
      })
      return
    }
    if (id_comanda === "") {
      toast.error("Erro ao localizar a conta", {
        style: {fontSize: 18}
      })
      return
    }

    toast((t) => (
      <QuestionBox
        title="Confirmação do consumo"
        pergunta="Confirma os dados do consumo?"
        handleConfirm={() => gravaConsumo(t.id)}
        handleCancel={() => toast.dismiss(t.id)}
      />
      ),
      {
        duration: 4000,
        style: {
          background: 'var(--bege2)',
          boxShadow: '1px 1px 4px 4px rgba(0, 0, 0, .2)'
        },
      }
    )
  }


  async function gravaConsumo(toastId?: string) {
    if (toastId) {
      toast.dismiss(toastId);
    }

    // Se não existir a comanda, abre uma nova conta na mesa
    setLoading(true)
    let comanda = {} as IComanda
    let achou = false

    try {
      const response = await api.get<IComanda>(`comandas/${ id_comanda }`)
      comanda = response.data
    }
    catch(err) {
      // console.log(err)
    }

    achou = comanda?.id === id_comanda

    // se não existe a comanda, precisa abrir nova conta
    try {
      if (!achou) {
        const hoje = new Date()
        const newComanda: IComanda = {
          id: id_comanda,
          dtAbertura: hoje.toISOString().substring(0,16),
          numMesa: numMesa,
          fechar: false,
          temNovoConsumo: true,
          // dtFecha: "",
          // quemFechou: "",
        }
        await api.post<IComanda>('comandas', { ...newComanda })
      }
      else {
        await api.put<IComanda>(`comandas/${ id_comanda }`, {
          ...comanda,
          temNovoConsumo: true
        })
      }
    }
    catch(error) {
      console.log(error.message)
      setLoading(false)
      toast.error('Erro ao gravar a comanda', {
        style: {fontSize: 18}
      })
      router.back()
    }

    const name = app.products.find(item => item.id === id_product)?.name || ""

    let newId = id
    if (!newId) {
      newId = uuid() as string
    }

    const newConsumo: IConsumo = {
      id: newId,
      id_comanda,
      id_product,
      name,
      qtd,
      vl_unit,
      vl_total,
      fechou: false,
      complemento
    }

    try {
      if (novo) {
        await api.post<IConsumo>('/consumo', { ...newConsumo })

      } else {
        await api.put<IConsumo>(`/consumo/${ id }`, { ...newConsumo })
      }

      setLoading(false)
      router.back()
    }
    catch(error: any) {
      console.log(error.message)
      setLoading(false)
      toast.error('Erro ao gravar o consumo', {
        style: {fontSize: 18}
      })
      router.back()
    }
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


  console.log(complemento)
  return (
    <>
      <Header title={`CONSUMO DA MESA Nº ${ router.query?.numMesa }`}>
        <S.ControlBox>
          <RoundButton color="var(--orange)" onClick={() => router.back()}>
            <ArrowLeftShort size={36} title="Voltar" color='var(--background)' />
          </RoundButton>
        </S.ControlBox>
      </Header>

      <S.Container>
        {
          loading && <Loading />
        }
        <S.Content>
          <S.FormContainer>
            <Beer size={300} />
          <S.Form>
            <label htmlFor='product'>Descrição do produto</label>
            <select
              value={id_product}
              onChange={(e) => setId_product(e.target.value)}
              id="product"
            >
              {
                app.products.map((item) => (
                  <option key={ item.id } value={ item.id }>
                    {
                      item.id === "0" ? '' : `${ item.id } - ${ item.name }`
                    }
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
              <option key={ "0" } value="" />
              {
                app.complementos.map((item) => (
                  <option key={ item.id } value={ item.name }>
                    { item.name }
                  </option>
                ))
              }
            </select>

            <label htmlFor="qtd">Quantidade</label>
            <div id="qtContainer">
              <input
                type="number" min="0" max="100"
                id="qtd"
                value={ strzero(qtd,2) }
                onChange={(e) => setQtd(parseInt(e.target.value))}
              />
              <button id="menos" type="button" onClick={() => setQtd(prev => prev - 1)}>
                &lt;
              </button>
              <button id="mais" type="button" onClick={() => setQtd(prev => prev + 1)}>
                &gt;
              </button>
            </div>

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
            <MyButton type="button" onClick={handleSubmit}>Confirma</MyButton>
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