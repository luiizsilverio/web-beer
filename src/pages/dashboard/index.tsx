import { useCallback, useMemo, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { LineChart, Line, XAxis, CartesianGrid } from 'recharts'
import { AttachMoney } from '@styled-icons/material';

import * as S from './styles'
import Header from '@/components/Header'
import Card from '@/components/Card'
import SelectInput from '@/components/SelectInput';

interface IData{
  name: string
  value: number
  quant: number
  color: string
}

interface IHistory {
  monthNo: number
  month: string  //3 letras
  totVal: number[] // toFixed(2)
  totQtd: number[] // toFixed(2)
}

const data: IData[] = [
  {
    name: "Chopp Pilsen",
    value: 450,
    quant: 45,
    color: 'crimson'
  },
  {
    name: "Chopp Weiss",
    value: 300,
    quant: 30,
    color: '#699fff'
  },
  {
    name: "Batata Chips",
    value: 150,
    quant: 15,
    color: 'orange'
  },
  {
    name: "Porcao Amendoim",
    value: 50,
    quant: 5,
    color: 'darkseagreen'
  },
  {
    name: "Água mineral",
    value: 50,
    quant: 5,
    color: 'violet'
  }
]

const history: IHistory[] = [
  {
    monthNo: 0,
    month: "Jan",
    totVal: [1000, 700, 500, 450, 300],
    totQtd: [100, 70, 50, 45, 30]
  },
  {
    monthNo: 1,
    month: "Fev",
    totVal: [900, 900, 700, 600, 450],
    totQtd: [90, 90, 70, 60, 45]
  },
  {
    monthNo: 2,
    month: "Mar",
    totVal: [1000, 700, 500, 450, 300],
    totQtd: [100, 70, 50, 45, 30]
  },
  {
    monthNo: 3,
    month: "Abr",
    totVal: [900, 900, 700, 600, 450],
    totQtd: [90, 90, 70, 60, 45]
  },
  {
    monthNo: 4,
    month: "Mai",
    totVal: [1000, 700, 500, 450, 300],
    totQtd: [100, 70, 50, 45, 30]
  },
  {
    monthNo: 5,
    month: "Jun",
    totVal: [900, 900, 700, 600, 450],
    totQtd: [90, 90, 70, 60, 45]
  },
  {
    monthNo: 6,
    month: "Jul",
    totVal: [700, 700, 300, 650, 500],
    totQtd: [70, 70, 30, 65, 50]
  },
  {
    monthNo: 7,
    month: "Ago",
    totVal: [700, 700, 300, 650, 500],
    totQtd: [70, 70, 30, 65, 50]
  },
  {
    monthNo: 8,
    month: "Set",
    totVal: [750, 700, 300, 650, 500],
    totQtd: [70, 70, 30, 65, 50]
  },
  {
    monthNo: 9,
    month: "Out",
    totVal: [750, 700, 300, 650, 500],
    totQtd: [70, 70, 30, 65, 50]
  },
  {
    monthNo: 10,
    month: "Nov",
    totVal: [750, 700, 300, 650, 500],
    totQtd: [70, 70, 30, 65, 50]
  },
  {
    monthNo: 11,
    month: "Dez",
    totVal: [770, 750, 330, 690, 560],
    totQtd: [70, 70, 30, 65, 50]
  }
]

interface ILista {
  label: string | number;
  value: string | number;
}

const periodos: ILista[] = [
  {
    label: "Hoje",
    value: 0
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
    label: "15 dias",
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
    value: "VL"
  }
]


export default function Dashboard() {
  const hoje = new Date()
  const [yearSel, setYearSel] = useState(hoje.getFullYear())
  const [periodoSel, setPeriodoSel] = useState(0)
  const [totalSel, setTotalSel] = useState("QT")

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

  const strzero = useCallback((valor, minSize: number): string => {
    let stnum = valor.toString().trim()
    if (stnum.length < minSize) {
      stnum = stnum.padStart(minSize, "0")
    }
    return stnum
  }, [])

  return (
    <>
      <Header title="Dashboard" />      

      <S.Main>
        <S.CardContainer widthCard1={40}>
          <Card title='Resumo'>
            <S.TotalContainer>
              <span>Valor Total:</span>
              <h1>R$ 1000,00</h1>
              <span>Qtd. de Contas:</span>
              <h1>25</h1>
              <span>Vl. Médio / Mesa:</span>
              <h1>R$ 40,00</h1>
              <AttachMoney size={270} /> 
            </S.TotalContainer>
          </Card>

          <Card title='Produtos Top 5'>
            <S.LegendContainer>
            {
              data.map(item => (
                <S.Legend color={ item.color } key={ item.name }>
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
        
        <S.CardContainer widthCard1={60}>
          <Card title='Faturamento Top 5' heightPx={210}>          
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

          <Card title='Categorias' heightPx={210}>
            <h2>Categorias</h2>
          </Card>
        </S.CardContainer>   
        
        <Card title='Faturamento Total' heightPx={210}>
          <h2>Faturamento</h2>
        </Card>

        <S.Footer>
          <p>Luiz Oliveira (2022)</p>
          <p>Todos os direitos reservados.</p>
        </S.Footer>
      </S.Main>
    </>
  )
}