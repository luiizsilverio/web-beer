import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { LineChart, Line, XAxis, CartesianGrid, BarChart, Bar, } from 'recharts'
import { format, subDays, addDays } from 'date-fns';
import Nookies from 'nookies'
import CryptoJS from 'crypto-js'

import { AttachMoney } from '@styled-icons/material';
import { ArrowUpShort, ArrowDownShort } from '@styled-icons/bootstrap';

import * as S from '@/styles/dashboard.styles'
import { IResumo } from '@/dtos';
import strzero from '@/utils/strzero'
import cores_grafico from '@/utils/cores';
import { useBeerContext } from '@/contexts'
import api, { apiConfig } from '@/services/api';

import Header from '@/components/Header'
import Card from '@/components/Card'
import SelectInput from '@/components/SelectInput';
import { Loading } from '@/components/Loading';

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
  totVal: number[]
  totQtd: number[]
  total?: number
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

const categories_: IData[] = [
  {
    id: '1',
    name: "BEBIDAS",
    value: 450,
    quant: 0,
    color: cores_grafico[0]
  },
  {
    id: '2',
    name: "BEBIDAS S/ ALCOOL",
    value: 280,
    quant: 0,
    color: cores_grafico[1]
  },
  {
    id: '3',
    name: "ALIMENTOS",
    value: 150,
    quant: 0,
    color: cores_grafico[2]
  },
  {
    id: '4',
    name: "PETISCOS",
    value: 90,
    quant: 0,
    color: cores_grafico[3]
  },
  {
    id: '5',
    name: "PRODUTOS",
    value: 30,
    quant: 0,
    color: cores_grafico[4]
  }  
]

const history: IHistory[] = [
  {
    monthNo: 0,
    month: "Jan",
    totVal: [1000, 700, 500, 450, 300],
    totQtd: [100, 70, 50, 45, 30],
    total: 2950    
  },
  {
    monthNo: 1,
    month: "Fev",
    totVal: [900, 900, 700, 600, 450],
    totQtd: [90, 90, 70, 60, 45],
    total: 3550
  },
  {
    monthNo: 2,
    month: "Mar",
    totVal: [1000, 700, 500, 450, 300],
    totQtd: [100, 70, 50, 45, 30],
    total: 2900
  },
  {
    monthNo: 3,
    month: "Abr",
    totVal: [900, 900, 700, 600, 450],
    totQtd: [90, 90, 70, 60, 45],
    total: 4000
  },
  {
    monthNo: 4,
    month: "Mai",
    totVal: [1000, 700, 500, 450, 300],
    totQtd: [100, 70, 50, 45, 30],
    total: 3200
  },
  {
    monthNo: 5,
    month: "Jun",
    totVal: [900, 900, 700, 600, 450],
    totQtd: [90, 90, 70, 60, 45],
    total: 2200
  },
  {
    monthNo: 6,
    month: "Jul",
    totVal: [700, 700, 300, 650, 500],
    totQtd: [70, 70, 30, 65, 50],
    total: 2800
  },
  {
    monthNo: 7,
    month: "Ago",
    totVal: [700, 700, 300, 650, 500],
    totQtd: [70, 70, 30, 65, 50],
    total: 3100
  },
  {
    monthNo: 8,
    month: "Set",
    totVal: [750, 700, 300, 650, 500],
    totQtd: [70, 70, 30, 65, 50],
    total: 4000
  },
  {
    monthNo: 9,
    month: "Out",
    totVal: [750, 700, 300, 650, 500],
    totQtd: [70, 70, 30, 65, 50],
    total: 2500
  },
  {
    monthNo: 10,
    month: "Nov",
    totVal: [750, 700, 300, 650, 500],
    totQtd: [70, 70, 30, 65, 50],
    total: 1800
  },
  {
    monthNo: 11,
    month: "Dez",
    totVal: [770, 750, 330, 690, 560],
    totQtd: [70, 70, 30, 65, 50],
    total: 4500
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
  const [periodoSel, setPeriodoSel] = useState(0)
  const [totalSel, setTotalSel] = useState("QT")
  const [categories, setCategories] = useState<IData[]>([])
  const [resumo, setResumo] = useState<IResumo>({} as IResumo)
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

  function loadCategorias(dt1, dt2: string) {
    api.get('estatistica/categorias', {
      params: {
        dtInicial: dt1,
        dtFinal: dt2
      }
    })
    .then(response => {
      const totais = response.data.map((item, index) => ({
        id: item.data,
        name: item.name,
        value: item.vl_total,
        qtd: item.qtd,
        color: cores_grafico[index]
      }))

      console.log('Categorias')
      setCategories(totais)
    })
  }

  function loadResumo(dt1, dt2: string) {
    api.get('estatistica/resumo', {
      params: {
        dtInicial: dt1,
        dtFinal: dt2,
        ndias: periodoSel + 1
      }
    })
    .then(response => {
      console.log('Resumo')
      setResumo(response.data)
    })
  }

  async function loadData() {
    setLoading(true)

    const hoje = new Date()
    const dt2 = hoje.toISOString()
    const dt1 = subDays(hoje, periodoSel + 1).toISOString()
    
    try {

        loadCategorias(dt1, dt2),
        loadResumo(dt1, dt2)

      console.log('OK')
    }
    catch (error) {
      console.log(error.message)
    }
    finally {
      console.log('OKK')
      setLoading(false)
    }
    // api.get('estatistica/categorias', {
    //   params: {
    //     dtInicial: dt1,
    //     dtFinal: dt2
    //   }
    // })
    // .then(response => {
    //   const totais = response.data.map((item, index) => ({
    //     id: item.data,
    //     name: item.name,
    //     value: item.vl_total,
    //     qtd: item.qtd,
    //     color: cores_grafico[index]
    //   }))

    //   setCategories(totais)

    // }).catch(error => {
    //   console.log(error.message)

    // }).finally(() => {
    //   setLoading(false)
    // })
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

    async function inicDados() {
      await loadData()
    }

    inicUser()
      .then((response) => {
        if (!response) {
          router.push('/signin')
        } else {
          inicDados()
        }
      })   

  }, [])


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

            <S.ArrowBox color="limegreen">
                <div title="Comparativo com o período anterior">
                  <p >+5.5%</p>
                  <ArrowUpShort size={22} />
                  {/* <ArrowDownShort size={22} /> */}
                </div>
              </S.ArrowBox>
          </Card>

          <Card title='Produtos Top 5'>
            <S.LegendContainer>
            {
              data.map(item => (
                <S.Legend color={ item.color } key={ item.name } totalSel={ totalSel }>
                  <div>
                    {                   
                      totalSel === "R$" 
                        ? item.value.toFixed(2)
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
                    data={ data }
                    dataKey={ totalSel === "R$" ? "value" : "quant" }
                  >
                    {
                      data.map((item) => (
                        <Cell key={ item.name } fill={ item.color } />
                      ))
                    }
                  </Pie>
                  
                  <Tooltip 
                    formatter={(value: number) => (
                      totalSel === "R$" 
                        ? `R$ ${value.toFixed(2)}`
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
              <SelectInput 
                  options={ periodos } 
                  defaultValue={ periodoSel }
                  onChange={(e) => handlePeriodo(e.target.value)}
                />
            </S.SelectContainer>
          </Card>
        </S.CardContainer>
        
        
          <Card 
            title={`Faturamento Top 5 ${ totalSel === 'R$' ? ': R$' : '' }`} 
            heightPx={210}
          >
            <S.ChartContainer>
              <ResponsiveContainer width="99%" height="99%">
                <LineChart 
                  data={ history }
                  margin={{ top: 20, bottom: 0, left: 15, right: 10 }}
                > 
                  <CartesianGrid strokeDasharray="2 1" stroke="grey" />
                  <XAxis dataKey="month" stroke="#cecece" />
                  {/* <XAxis dataKey={} type="number" /> */}

                  {
                    data.map((item, index) => (
                      <Line dataKey={ `totVal[${ index }]` }
                        key={ item.name }
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
                        ? `R$ ${value.toFixed(2)}`
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
          
            <Card title='Categorias: R$'>
              <S.LegendContainer>
              {
                categories.map(item => (
                  <S.Legend color={ item.color } key={ item.name } totalSel="R$" >
                    <div>
                      {                   
                        item.value.toFixed(2)
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
                        `R$ ${value.toFixed(2)}`
                      )}
                      contentStyle={{borderRadius: "8px", opacity: 0.8}}
                      animationDuration={0} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </S.ChartContainer>
            </Card>

            <Card title='Faturamento Total: R$'>
              <ResponsiveContainer width="99%" height="99%">
                <BarChart 
                  data={ history }                     
                  margin={{ top: 20, bottom: 0, left: 10, right: 10 }}
                > 
                  <CartesianGrid strokeDasharray="2 1" stroke="grey" />
                  <XAxis dataKey="month" stroke="#cecece" />

                  <Bar 
                    dataKey="total" 
                    fill={"var(--scrollbar)"}
                  />
                  
                  <Tooltip 
                    formatter={(value: number) => ( `R$ ${value.toFixed(2)}` )}
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
          <p>Todos os direitos reservados.</p>
        </S.Footer>
      </S.Main>
    </>
  )
}


