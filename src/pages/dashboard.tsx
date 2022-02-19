import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { LineChart, Line, XAxis, CartesianGrid, BarChart, Bar, } from 'recharts'
import { format, subDays } from 'date-fns';
import Nookies from 'nookies'
import CryptoJS from 'crypto-js'

import { AttachMoney } from '@styled-icons/material';
import { ArrowUpShort, ArrowDownShort } from '@styled-icons/bootstrap';

import * as S from '@/styles/dashboard.styles'
import { IResumo, ITop5 } from '@/dtos';
import strzero from '@/utils/strzero'
import cores_grafico from '@/utils/cores';
import months from '@/utils/months';
import { useBeerContext } from '@/contexts'
import api, { apiConfig } from '@/services/api';

import Header from '@/components/Header'
import Card from '@/components/Card'
import SelectInput from '@/components/SelectInput';
import { Loading } from '@/components/Loading';
import { exit } from 'process';

interface IData{
  id: string
  name: string
  value: number
  quant: number
  color: string
}

interface IHistory {
  monthNo: number
  month: string
  vl_total: number
}

interface ITop5History {
  monthNo: number
  month: string
  vl_total: number[]
  qtd: number[]
}

const data: IData[] = [
  {
    id: '1',
    name: "Chopp Pilsen",
    value: 450,
    quant: 45,
    color: cores_grafico[0]
  },
  {
    id: '2',
    name: "Chopp Weiss",
    value: 300,
    quant: 30,
    color: cores_grafico[1]
  },
  {
    id: '3',
    name: "Batata Chips",
    value: 150,
    quant: 15,
    color: cores_grafico[2]
  },
  {
    id: '4',
    name: "Porcao Amendoim",
    value: 50,
    quant: 5,
    color: cores_grafico[3]
  },
  {
    id: '5',
    name: "Água mineral",
    value: 50,
    quant: 5,
    color: cores_grafico[4]
  }
]

interface ILista {
  label: string | number;
  value: string | number;
}

const periodos: ILista[] = [
  {
    label: "Hoje",
    value: 1
  },
  {
    label: "2 dias",
    value: 2
  },
  {
    label: "7 dias",
    value: 7
  },
  {
    label: "10 dias",
    value: 10
  },
  {
    label: "2 semanas",
    value: 15
  },
  {
    label: "20 dias",
    value: 20
  },
  {
    label: "30 dias",
    value: 30
  },
  {
    label: "2 meses",
    value: 60
  },
  {
    label: "3 meses",
    value: 90
  },
  {
    label: "6 meses",
    value: 180
  },
  {
    label: "1 ano",
    value: 365
  }
]

const totais: ILista[] = [
  {
    label: "Qtd.",
    value: "QT"
  },
  {
    label: "R$",
    value: "R$"
  }
]

export default function Dashboard() {
  const hoje = new Date()
  const [yearSel, setYearSel] = useState(hoje.getFullYear())
  const [periodoSel, setPeriodoSel] = useState(1)
  const [totalSel, setTotalSel] = useState("QT")
  const [categories, setCategories] = useState<IData[]>([])
  const [resumo, setResumo] = useState<IResumo>({} as IResumo)
  const [history, setHistory] = useState<IHistory[]>([])
  const [top5, setTop5] = useState<ITop5[]>([])
  const [top5history, setTop5history] = useState<ITop5History[]>([])
  const [loading, setLoading] = useState(false)
  const { checaAdmin, senha, logout, isAdmin } = useBeerContext()
  const router = useRouter()

  const years: ILista[] = useMemo(() => {
    const lista = []
    const anoAtual = hoje.getFullYear()

    for(let y = anoAtual -4; y <= anoAtual; y++) {
      lista.push({
        value: y,
        label: y.toString()
      })
    }

    return lista
  }, [])

  const handleYear = useCallback((year: string) => {
    const ano = parseInt(year)
    if (!isNaN(ano)) {
      setYearSel(ano)
    } else {
      throw new Error('Ano inválido');
    }
  }, [])

  const handlePeriodo = useCallback((per: string) => {
    const ndias = parseInt(per)
    if (!isNaN(ndias)) {
      setPeriodoSel(ndias)
    } else {
      throw new Error('Período inválido');
    }
  }, [])

  async function loadCategorias(dt1, dt2: string) {
    const response = await api.get('estatistica/categorias', {
      params: {
        dtInicial: dt1,
        dtFinal: dt2
      }
    })

    const totais = response.data.map((item, index) => ({
      id: item.data,
      name: item.name,
      value: item.vl_total,
      qtd: item.qtd,
      color: cores_grafico[index]
    }))

    setCategories(totais)
  }

  async function loadResumo(dt1, dt2: string) {
    const response = await api.get('estatistica/resumo', {
      params: {
        dtInicial: dt1,
        dtFinal: dt2,
        ndias: periodoSel
      }
    })

    const totais: IResumo = {
      vl_total: response.data.vl_total?.toFixed(2),
      vlMedio: response.data.vlMedio?.toFixed(2),
      qtdMesas: strzero(response.data.qtdMesas, 3),
      comparativo: response.data.comparativo
    }

    setResumo(totais)
  }

  async function loadHistory(ano: number) {
    const response = await api.get('estatistica/anual', {
      params: {
        ano: ano.toString()
      }
    })

    const totais: IHistory[] = response.data.map((item, index) => ({
      monthNo: months[index].value,
      month: months[index].label.substring(0,3),
      vl_total: item
    }))

    setHistory(totais)
  }

  async function loadTop5(dt1, dt2: string) {
    const response = await api.get('estatistica/top5/produtos', {
      params: {
        dtInicial: dt1,
        dtFinal: dt2,
        unidade: totalSel === 'R$' ? 'VL' : 'QT'
      }
    })

    const totais: ITop5[] = response.data.map((item, index) => ({
      id_product: item.id_product,
      name: item.name,
      vl_total: item.vl_total,
      quant: item.qtd,
      color: cores_grafico[index]
    }))

    const produtos = response.data.map((item, index) => (
      item.id_product
    ))

    setTop5(totais)

    loadTop5history(yearSel, produtos)
  }

  async function loadTop5history(ano: number, produtos: string[]) {
    if (produtos.length === 0 || !produtos[0]) {
      setTop5history([])
      return
    }

    const vpar = {
      ano: ano.toString(),
      prod1: '',
      prod2: '',
      prod3: '',
      prod4: '',
      prod5: '',
    }

    if (produtos.length > 0) vpar.prod1 = produtos[0]
    if (produtos.length > 1) vpar.prod2 = produtos[1]
    if (produtos.length > 2) vpar.prod3 = produtos[2]
    if (produtos.length > 3) vpar.prod4 = produtos[3]
    if (produtos.length > 4) vpar.prod5 = produtos[4]

    const totais: ITop5History[] = []

    for (let i = 0; i < 12; i++) {
      totais.push({
        monthNo: months[i].value,
        month: months[i].label.substring(0, 3),
        vl_total: Array(produtos.length).fill(0),
        qtd: Array(produtos.length).fill(0)
      })
    }

    const response = await api.get('estatistica/top5/anual', { params: vpar })

    response.data.map((item, index) => {
      const prod = produtos.findIndex(prod => prod === item.id_product)

      for (let mes = 0; mes < 12; mes++) {
        totais[mes].vl_total[prod] = item.vl_total[mes]
        totais[mes].qtd[prod] = item.qtd[mes]
      }
    })

    setTop5history(totais)
  }

  async function loadData() {
    setLoading(true)
    console.log('loadData')

    const hoje = new Date()
    const dt2 = hoje.toISOString()
    const dt1 = subDays(hoje, periodoSel + 1).toISOString()

    // executa todas as chamadas à API, antes de prosseguir

    try {
      await Promise.all([
        loadResumo(dt1, dt2),
        loadTop5(dt1, dt2),
        loadCategorias(dt1, dt2),
        loadHistory(yearSel),
      ])
    }
    catch (error) {
      console.log(error.message)
      if (!apiConfig.ok) {
        router.push('/infoip')
      }
    }
    finally {
      setLoading(false)
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
    async function inicDados() {
      await loadData()
    }

    if (isAdmin && !loading) {
      inicDados()
    }
  }, [periodoSel, yearSel])


  return (
    <>
      <Header title="Dashboard" />

      <S.Main>

        {
          loading && <Loading />
        }

        <S.CardContainer widthCard1={40}>
          <Card title='Resumo'>
            <S.TotalContainer>
              <span>Valor Total:</span>
              <h1>R$ { resumo.vl_total }</h1>
              <span>Qtd. de Contas:</span>
              <h1>{ resumo.qtdMesas }</h1>
              <span>Vl. Médio / Mesa:</span>
              <h1>R$ { resumo.vlMedio }</h1>
              <AttachMoney size={270} />
            </S.TotalContainer>

            {
              resumo.comparativo >= 0
              ?
                <S.ArrowBox color="limegreen">
                  <div title="Comparativo com o período anterior">
                    <p>+{ resumo.comparativo }%</p>
                    <ArrowUpShort size={22} />
                  </div>
                </S.ArrowBox>
              :
                <S.ArrowBox color="crimson">
                  <div title="Comparativo com o período anterior">
                    <p>{ resumo.comparativo }%</p>
                    <ArrowDownShort size={22} />
                  </div>
                </S.ArrowBox>
            }

            <S.SelectContainer>
              <SelectInput
                options={ periodos }
                defaultValue={ periodoSel }
                onChange={(e) => handlePeriodo(e.target.value)}
              />
            </S.SelectContainer>
          </Card>

          <Card title='Produtos Top 5'>
            <S.LegendContainer>
            {
              top5.map(item => (
                <S.Legend color={ item.color } key={ item.id_product } totalSel={ totalSel }>
                  <div>
                    {
                      totalSel === "R$"
                        ? item.vl_total?.toFixed(2)
                        : strzero(item.quant, 3)
                    }
                  </div>
                  <span>{ item.name }</span>
                </S.Legend>
              ))
            }
            </S.LegendContainer>

            <S.ChartContainer>
              <ResponsiveContainer width="99%" height="99%">
                <PieChart>
                  <Pie
                    data={ top5 }
                    dataKey={ totalSel === "R$" ? "vl_total" : "quant" }
                  >
                    {
                      top5.map((item) => (
                        <Cell key={ item.name } fill={ item.color } />
                      ))
                    }
                  </Pie>

                  <Tooltip
                    formatter={(value: number) => (
                      totalSel === "R$"
                        ? `R$ ${value?.toFixed(2)}`
                        : strzero(value, 3)
                    )}
                    contentStyle={{borderRadius: "8px", opacity: 0.8}}
                    animationDuration={0}
                  />
                </PieChart>
              </ResponsiveContainer>
            </S.ChartContainer>

            <S.SelectContainer>
              <SelectInput
                  options={ totais }
                  defaultValue={ totalSel }
                  onChange={(e) => setTotalSel(e.target.value)}
                />
            </S.SelectContainer>
          </Card>
        </S.CardContainer>

        <Card
          title='Faturamento Top 5'
          heightPx={210}
          valorR$={ totalSel === 'R$' }
        >
          <S.ChartContainer>
            <ResponsiveContainer width="99%" height="99%">

              <LineChart
                data={ top5history }
                margin={{ top: 20, bottom: 0, left: 15, right: 10 }}
              >
                <CartesianGrid strokeDasharray="2 1" stroke="grey" />
                <XAxis dataKey="month" stroke="#cecece" />

                {
                  top5.map((item, index) => (
                    <Line
                      dataKey={
                        totalSel === "R$"
                          ? `vl_total[${ index }]`
                          : `qtd[${ index }]`
                      }
                      key={ item.id_product }
                      name={ item.name }
                      type="monotone"
                      stroke={ item.color }
                      strokeWidth={4}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  ))
                }

                <Tooltip
                  formatter={(value: number) => (
                    totalSel === "R$"
                      ? `R$ ${value?.toFixed(2)}`
                      : strzero(value, 3)
                  )}
                  cursor={{ fill: 'none '}}
                  contentStyle={{borderRadius: "8px", opacity: 0.8}}
                  labelStyle={{color: "#1f1f24", fontWeight: 600 }}
                  animationDuration={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </S.ChartContainer>

          <S.SelectContainer>
            <SelectInput
              options={ years }
              defaultValue={ yearSel }
              onChange={(e) => handleYear(e.target.value)}
            />
          </S.SelectContainer>
        </Card>

        <S.CardContainer widthCard1={50}>
          <Card
            title='Categorias:'
            valorR$={true}
          >
            <S.LegendContainer>
            {
              categories.map(item => (
                <S.Legend color={ item.color } key={ item.id } totalSel="R$" >
                  <div>
                    {
                      item.value?.toFixed(2)
                    }
                  </div>
                  <span>{ item.name }</span>
                </S.Legend>
              ))
            }
            </S.LegendContainer>

            <S.ChartContainer>
              <ResponsiveContainer width="99%" height="99%">
                <PieChart>
                  <Pie
                    data={ categories }
                    dataKey="value"
                    cx={64}
                    cy={90}
                    innerRadius={40}
                    outerRadius={66}
                    paddingAngle={5}
                  >
                    {
                      categories.map((item) => (
                        <Cell key={ item.name } fill={ item.color } />
                      ))
                    }
                  </Pie>

                  <Tooltip
                    formatter={(value: number) => (
                      `R$ ${value?.toFixed(2)}`
                    )}
                    contentStyle={{borderRadius: "8px", opacity: 0.8}}
                    animationDuration={0}
                  />
                </PieChart>
              </ResponsiveContainer>
            </S.ChartContainer>
          </Card>

          <Card
            title='Faturamento Total'
            valorR$={true}
          >
            <ResponsiveContainer width="99%" height="99%">
              <BarChart
                data={ history }
                margin={{ top: 20, bottom: 0, left: 10, right: 10 }}
              >
                <CartesianGrid strokeDasharray="2 1" stroke="grey" />
                <XAxis dataKey="month" stroke="#cecece" />

                <Bar
                  dataKey="vl_total"
                  fill={"var(--scrollbar)"}
                />

                <Tooltip
                  formatter={(value: number) => ( `R$ ${value?.toFixed(2)}` )}
                  cursor={{ fill: 'none '}}
                  contentStyle={{borderRadius: "8px", opacity: 0.8}}
                  labelStyle={{color: "#1f1f24", fontWeight: 600 }}
                  animationDuration={0}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </S.CardContainer>

        <S.Footer>
          <p>Luiz Oliveira (2022)</p>
          <p>&copy; Todos os direitos reservados.</p>
        </S.Footer>
      </S.Main>
    </>
  )
}