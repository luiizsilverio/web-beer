import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router';
import Nookies from 'nookies'
import CryptoJS from 'crypto-js'

import * as S from '@/styles/mesas.styles'
import { useBeerContext } from '@/contexts';
import api, { apiConfig } from '@/services/api'
import { IComanda, IMesa } from '@/dtos';

import Header from '@/components/Header'
import { Mesa } from '@/components/Mesa'


export default function Mesas() {
  // const { isAdmin, checaAdmin, senha, logout, config } = useBeerContext()
  const app = useBeerContext()
  const router = useRouter()

  const [mesas, setMesas] = useState<IMesa[]>([])
  const [mesaSelecionada, setMesaSelecionada] = useState<IMesa>({} as IMesa)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(true)

  function handlePedido(mesa: IMesa) {
    if (mesa.numMesa > 0) {
      setMesaSelecionada(mesa)
      setModalOpen(true)
    }
  }

  async function inicializaGrid() {
    const grid: IMesa[] = []

    console.log('inicializaGrid')
    setLoading(true)

    try {
      const cfg = await app.getConfig()
      let qtd_mesas = cfg.qtd_mesas

      if (!apiConfig.ok) {
        router.push('/infoip')
        return
      }

      for(var i = 0; i < qtd_mesas; i++) {
        grid.push({
          numMesa: i + 1,
          situacao: 'Livre',
          id_comanda: '0'
        })
      }

      // buscar da API
      const response = await api.get<IComanda[]>(`comandas`)

      if (!response) return

      response.data.forEach((conta: IComanda) => {
        const numMesa = conta.numMesa ? conta.numMesa : "0"
        const idx = grid.findIndex(mesa => mesa.numMesa === numMesa)
        if (idx >= 0) {
          grid[idx].situacao = 'Ocupada'
          grid[idx].fechar = conta.fechar
          grid[idx].id_comanda = conta.id
          grid[idx].temNovoConsumo = conta.temNovoConsumo
        }
      })

    } catch(error) {
      console.log(error.message)

    } finally {
      setMesas(grid)
      setLoading(false)
    }
  }

  function atualizaGrid() {
    async function inic() {
      if (modalOpen) {
        setModalOpen(false)
      }
      await inicializaGrid()
    }
    inic()
  }

  useEffect(() => {
    async function inicUser() {
      let mySenha = app.senha

      if (!app.isAdmin) {
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
        app.logout()
        return false
      }
      else {
        return await app.checaAdmin(mySenha)
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

  useEffect(() => {
    async function inic() {
      await inicializaGrid()
    }

    const timer = setTimeout(() => {
      // if (refresh && !loading && !modalOpen && !transfer.dragging) {
      if (refresh && !loading && !modalOpen) {
        inic()
      }
      setRefresh(prev => !prev)
    }, 7000) // atualiza o mapa a cada 7 segundos

    return () => {
      clearTimeout(timer)
    }
  }, [refresh])


  useEffect(() => {
    async function inic() {
      await inicializaGrid()
    }

    if (refresh && !loading && !modalOpen) {
        inic()
    }
}, []);


  return (
    <>
      <Header title="Fechamento de Conta" />

      {/* {
        loading && <Loading />
      } */}

      <S.Main>
      {
        mesas.map((item: IMesa) => (
          <Mesa
            key={ item.numMesa.toString() }
            numMesa={ item.numMesa }
            ocupado={ item.situacao === 'Ocupada' }
            fechar={ item.fechar || item.temNovoConsumo }
            onPress={() => handlePedido(item)}
            width={100}
            height={110}
          />
        ))
      }
      </S.Main>
    </>
  )
}