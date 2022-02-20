import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

import { Add } from '@styled-icons/material-rounded'
import { Flag } from '@styled-icons/entypo'
import { Checkmark } from '@styled-icons/ionicons-outline'
import { ArrowLeftShort } from '@styled-icons/bootstrap'

import * as S from '@/styles/fechar.styles'
import api, { apiConfig } from '@/services/api'
import { IComanda, IConsumo, IMesa } from '@/dtos'
import strzero from '@/utils/strzero'
import Header from '@/components/Header'
import FecharCard from '@/components/FecharCard'
import RoundButton from '@/components/RoundButton'
import QuestionBox from '@/components/QuestionBox';

const lista: IConsumo[] = [
  {
    id: '1',
    id_comanda: '1',
    id_product: '1',
    name: "Agua s/Gas",
    qtd: 2,
    vl_unit: 7,
    vl_total: 14,
    complemento: "com gelo e limão",
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
  {
    id: '3',
    id_comanda: '1',
    id_product: '3',
    name: "Cerveja Weiss",
    qtd: 1,
    vl_unit: 12,
    vl_total: 12,
    fechou: false
  },
  {
    id: '4',
    id_comanda: '1',
    id_product: '4',
    name: "Ovo de codorna",
    qtd: 1,
    vl_unit: 5,
    vl_total: 5,
    fechou: false
  },
  {
    id: '4',
    id_comanda: '1',
    id_product: '4',
    name: "Ovo de codorna",
    qtd: 1,
    vl_unit: 5,
    vl_total: 5,
    fechou: false
  },
  {
    id: '5',
    id_comanda: '1',
    id_product: '5',
    name: "Porção de azeitonas",
    qtd: 1,
    vl_unit: 5,
    vl_total: 5,
    fechou: false
  },
  {
    id: '6',
    id_comanda: '1',
    id_product: '6',
    name: "Cerveja Pilsen 300 ML",
    qtd: 2,
    vl_unit: 7,
    vl_total: 14,
    fechou: true
  },
]

export default function Fechar() {
  const [comanda, setComanda] = useState<IComanda>({} as IComanda)
  const [consumos, setConsumos] = useState<IConsumo[]>([])
  const [consumo, setConsumo] = useState<IConsumo>({} as IConsumo)
  const [id_comanda, setId_comanda] = useState("")
  const [newConta, setNewConta] = useState(false)

  const router = useRouter()
  const mesa: IMesa = router.query?.mesa ? JSON.parse(router.query.mesa.toString()) : null
  const numMesa = mesa ? strzero(mesa.numMesa, 2) : ""

  const total = useMemo(() => consumos.reduce((acc, item) => {
    return acc + item.vl_total
  }, 0), [consumos])

  function handleBack() {
    router.back()
  }

  function handleAdd() {
    console.log('add')
  }


  function pediuFecharConta() {
    async function fecharConta(fechar: boolean, toastId?: string) {
      if (toastId) {
        toast.dismiss(toastId);
      }
      if (comanda.fechar === fechar) {
        return
      }

      try {

        const newComanda = {...comanda, fechar: fechar}

        await api.put<IComanda>(`comandas/${mesa.id_comanda}`, { ...newComanda })

        //setComanda(newComanda) //não precisa, pois vai fechar a janela
        router.back()
      }
      catch (error: any) {
        console.log(error.message)
        toast.error('Erro ao fechar a conta')
        router.back()
      }
    }

    toast((t) => (
      <QuestionBox
        title="Sinalizar 🚩"
        pergunta="Cliente pediu para fechar a conta?"
        handleConfirm={() => fecharConta(true, t.id)}
        handleCancel={() => fecharConta(false, t.id)}
      />
      ),
      {
        duration: 2000,
        style: {
          background: 'var(--bege2)',
          boxShadow: '1px 1px 4px 4px rgba(0, 0, 0, .2)'
        },
      }
    )
  }


  async function abreComanda() {
    if (!mesa) {
      setConsumos([])
      return
    }

    let id = id_comanda
    if (id === "" || id === "0") {
      id = mesa.id_comanda
    }
    if (id === "" || id === "0") {
      setNewConta(true)
      return
    }

    try {
      const response = await api.get<IComanda>(`comandas/${ id }`)

      if (id !== id_comanda) {
        setId_comanda(id)
      }

      setComanda(response.data)

      const despesas = await api.get<IConsumo[]>("consumo", {
        params: {
          id_comanda: id,
          _sort: 'name',
          _order: 'asc'
        }
      })

      setConsumos(despesas.data)
    }
    catch (error: any) {
      console.log(error.message)
    }
  }


  function handleFecharConta() {
    async function fecharConta(id: string, toastId?: string) {
      if (toastId) {
        toast.dismiss(toastId);
      }
      try {
        const hoje = new Date()
        const newComanda: IComanda = {
          ...comanda,
          temNovoConsumo: false,
          dtFecha: hoje.toISOString().substring(0,16),
          quemFechou: 'operador'
        }

        await api.put<IComanda>(`comandas/${ id }`, { ...newComanda })

        router.back()
      }
      catch (err: any) {
        console.log(err.message)
        toast.error('Erro ao fechar a conta')
        router.back()
      }
    }

    let id = id_comanda
    if (id === "" || id === "0") {
      id = mesa?.id_comanda
    }
    if (id === "" || id === "0") {
      return
    }

    toast((t) => (
      <QuestionBox
        title="Fechar a Conta 🍺"
        pergunta="Deseja fechar a conta?"
        handleConfirm={() => fecharConta(id, t.id)}
        handleCancel={() => toast.dismiss(t.id)}
      />
      ),
      {
        duration: 2000,
        style: {
          background: 'var(--bege2)',
          boxShadow: '1px 1px 4px 4px rgba(0, 0, 0, .2)'
        },
      }
    );
  }

  async function ticarConsumo(desp: IConsumo) {
    const newConsumo: IConsumo = {
      id: desp.id,
      id_comanda: desp.id_comanda,
      id_product: desp.id_product,
      name: desp.name,
      qtd: desp.qtd,
      vl_unit: desp.vl_unit,
      vl_total: desp.vl_total,
      fechou: !desp.fechou
    }

    try {
      await api.put<IConsumo>(`consumo/${ desp.id }`, { ...newConsumo })

      const idx = consumos.findIndex(item => item.id === desp.id)
      consumos[idx].fechou = newConsumo.fechou

      const temNovoConsumo = consumos.some(item => !item.fechou)
      if (temNovoConsumo !== comanda.temNovoConsumo) {
        await api.put<IComanda>(`comandas/${ id_comanda }`, {
          ...comanda,
          temNovoConsumo
        })

        setNewConta(true)
      }
    }
    catch (error: any) {
      console.log(error.message)
    }
  }

  async function excluiConsumo(id: string, toastId?: string) {
    if (toastId) {
      toast.dismiss(toastId);
    }

    try {
      await api.delete(`consumo/${ id }`)

      // abreComanda()
      const lista = [...consumos].filter(item => item.id !== id)
      setConsumos(lista)
      setNewConta(true)

      const temNovoConsumo = consumos.some(item => !item.fechou)
      if (temNovoConsumo !== comanda.temNovoConsumo) {
        await api.put<IComanda>(`comandas/${ id_comanda }`, {
          ...comanda,
          temNovoConsumo
        })
      }
    }
    catch (error: any) {
      console.log(error.message)
      toast.error("Erro ao excluir o consumo")
    }
  }

  function handleExcluiConsumo(consumo: IConsumo) {
    if (!consumo.id) {
      return
    }

    toast((t) => (
      <QuestionBox
        title="Exclusão de Consumo 💀"
        pergunta="Confirma excluir este consumo?"
        handleConfirm={() => excluiConsumo(consumo.id, t.id)}
        handleCancel={() => toast.dismiss(t.id)}
      />
      ),
      {
        duration: 2000,
        style: {
          background: 'var(--bege2)',
          boxShadow: '1px 1px 4px 4px rgba(0, 0, 0, .2)'
        },
      }
    )
  }


  useEffect(() => {
    async function inic() {
      await abreComanda()
    }

    inic()

    // se tiver algum consumo que não foi ticado, avisa
    let toastId

    if (mesa?.fechar) {
      setTimeout(() => {
        toastId = toast.success('Cliente pediu para fechar a conta', {
          duration: 1500,
          position: 'top-center',
          style: {fontSize: 18}
        })
      }, 200)
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId)
      }
    }
  }, [])


  return (
    <>
      <Header title={`MESA Nº ${ numMesa }`}>
        <S.ControlBox>
          <RoundButton color="var(--orange)" onClick={handleBack}>
            <ArrowLeftShort size={36} title="Voltar" />
          </RoundButton>
          <RoundButton color="#0f86fa" onClick={handleAdd}>
            <Add size={32} title="Lançar novo consumo" />
          </RoundButton>
          <RoundButton color="#c53030" onClick={pediuFecharConta}>
            <Flag size={26} title="Cliente pediu para fechar a conta" />
          </RoundButton>
          <RoundButton color="mediumseagreen" onClick={handleFecharConta}>
            <Checkmark size={30} title="Fechar a conta" />
          </RoundButton>
        </S.ControlBox>
      </Header>

      <S.Container>
        <S.Content>
          <ul>
            {
              consumos.map((item) => (
                <li key={ item.id }>
                  <FecharCard
                    data={ item }
                    handleDelete={() => handleExcluiConsumo(item)}
                    handleEdit={() => {}}
                    handleTicar={() => ticarConsumo(item)}
                  />
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

      <Toaster />
    </>
  )
}