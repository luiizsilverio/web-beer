import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuid } from 'uuid'

import { Add } from '@styled-icons/material-rounded'
import { Flag } from '@styled-icons/entypo'
import { Checkmark } from '@styled-icons/ionicons-outline'
import { ArrowLeftShort } from '@styled-icons/bootstrap'

import * as S from '@/styles/fechar.styles'
import api from '@/services/api'
import { IComanda, IConsumo, IMesa } from '@/dtos'
import strzero from '@/utils/strzero'
import Header from '@/components/Header'
import FecharCard from '@/components/FecharCard'
import RoundButton from '@/components/RoundButton'
import QuestionBox from '@/components/QuestionBox';


export default function Fechar() {
  const [comanda, setComanda] = useState<IComanda>({} as IComanda)
  const [consumos, setConsumos] = useState<IConsumo[]>([])
  const [consumo, setConsumo] = useState<IConsumo>({} as IConsumo)
  const [id_comanda, setId_comanda] = useState("")

  const router = useRouter()
  const mesa: IMesa = router.query?.mesa ? JSON.parse(router.query.mesa.toString()) : null
  const numMesa = mesa ? strzero(mesa.numMesa, 2) : ""

  const total = useMemo(() => consumos.reduce((acc, item) => {
    return acc + item.vl_total
  }, 0), [consumos])


  function handleBack() {
    router.back()
  }

  function incluiConsumo() {
    let id = id_comanda
    if (id === "" || id === "0") {
      id = mesa.id_comanda
    }
    if (id === "" || id === "0") {
      id = uuid() as string
    }
    if (id_comanda !== id) {
      setId_comanda(id)
    }

    setConsumo({} as IConsumo)

    router.push({
      pathname: '/consumo',
      query: {
        numMesa,
        id: null,
        id_comanda: id,
        id_product: '',
        qtd: 1,
        vl_unit: 0.0,
        // vl_total: 0.0,
        complemento: ''
      }
    })
  }


  function alteraConsumo(consumo: IConsumo) {
    setConsumo(consumo)

    router.push({
      pathname: '/consumo',
      query: {
        numMesa,
        id: consumo.id,
        id_comanda: consumo.id_comanda,
        id_product: consumo.id_product,
        qtd: consumo.qtd,
        vl_unit: consumo.vl_unit,
        // vl_total: consumo.vl_total,
        complemento: consumo.complemento
      }
    })
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
        handleBack()
      }
      catch (error: any) {
        console.log(error.message)
        toast.error('Erro ao fechar a conta', {
          style: {fontSize: 18}
        })
        handleBack()
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
      toast.error('Erro ao abrir a conta', {
        style: {fontSize: 18}
      })
      handleBack()
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

        handleBack()
      }
      catch (err: any) {
        console.log(err.message)
        toast.error('Erro ao fechar a conta', {
          style: {fontSize: 18}
        })
        handleBack()
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
      // atualiza no banco a tabela consumo
      await api.put<IConsumo>(`consumo/${ desp.id }`, { ...newConsumo })

      // atualiza o estado consumos
      const newConsumos = consumos.map((item, index) => {
        if (item.id === desp.id) {
          return {...item, fechou: newConsumo.fechou}
        } else {
          return {...item}
        }
      })

      setConsumos(newConsumos)

      // atualiza no banco a tabela comandas
      const temNovoConsumo = newConsumos.some(item => !item.fechou)
      if (temNovoConsumo !== comanda.temNovoConsumo) {
        await api.put<IComanda>(`comandas/${ id_comanda }`, {
          ...comanda,
          temNovoConsumo
        })
      }
    }
    catch (error: any) {
      console.log(error.message)
      toast.error('Erro ao ticar o consumo', {
        style: {fontSize: 18}
      })
      handleBack()
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

      const temNovoConsumo = lista.some(item => !item.fechou)
      if (temNovoConsumo !== comanda.temNovoConsumo) {
        await api.put<IComanda>(`comandas/${ id_comanda }`, {
          ...comanda,
          temNovoConsumo
        })
      }
    }
    catch (error: any) {
      console.log(error.message)
      toast.error("Erro ao excluir o consumo", {
        style: {fontSize: 18}
      })
      handleBack()
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
  }, [])


  useEffect(() => {
    let toastId

    // se tiver algum consumo que não foi ticado, avisa
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
            <ArrowLeftShort size={36} title="Voltar" color='var(--background)' />
          </RoundButton>
          <RoundButton color="#0f86fa" onClick={incluiConsumo}>
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
                    handleEdit={() => alteraConsumo(item)}
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