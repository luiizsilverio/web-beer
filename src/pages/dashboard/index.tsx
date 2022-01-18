import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, YAxis } from 'recharts'
import { BarChart, Bar, LineChart,
  Line,
  XAxis,
  CartesianGrid } from 'recharts'
import { AttachMoney } from '@styled-icons/material';

import * as S from './styles'
import Aside from '@/components/Aside'
import Header from '@/components/Header'
import Card from '@/components/Card'

interface IData{
  name: string
  value: number
  percent: number
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
    percent: 45,
    color: 'crimson'
  },
  {
    name: "Chopp Weiss",
    value: 300,
    percent: 30,
    color: '#699fff'
  },
  {
    name: "Batata Chips",
    value: 150,
    percent: 15,
    color: 'orange'
  },
  {
    name: "Porcao Amendoim",
    value: 50,
    percent: 5,
    color: 'darkseagreen'
  },
  {
    name: "Água mineral",
    value: 50,
    percent: 5,
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

export default function Dashboard() {
  return (
    <>
      <Header title="Dashboard" />
      <S.Main>
        <S.CardContainer>
          <Card title='Total de Vendas'>
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

          <Card title='Produtos mais vendidos'>
            <S.LegendContainer>
            {
              data.map(item => (
                <S.Legend color={ item.color } key={ item.name }>
                  <div>{ item.percent.toFixed(1) }%</div>
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
                    dataKey="value"
                  >
                    {
                      data.map((item) => (
                        <Cell key={ item.name } fill={ item.color } />
                      ))
                    }
                  </Pie>
                  
                  <Tooltip 
                    formatter={(value: number) => (`R$ ${value.toFixed(2)}`)}
                    contentStyle={{borderRadius: "8px", opacity: 0.8}}
                    animationDuration={0} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </S.ChartContainer>
          </Card>
        </S.CardContainer>
        
        <Card title='Evolução de Vendas' heightPx={220}>
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

                {/* <Line dataKey="totVal[0]" 
                  name="Agua" 
                  type="monotone"
                  stroke="#ccc"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
                <Line dataKey="totVal[1]" 
                  name="Weiss" 
                  type="monotone"
                  stroke="#c11"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
                <Line dataKey="totVal[2]" 
                  name="Batata" 
                  type="monotone"
                  stroke="#cf1"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
                <Line dataKey="totVal[3]" 
                  name="Amendoim" 
                  type="monotone"
                  stroke="#bcf"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
                <Line dataKey="totVal[4]" 
                  name="Agua" 
                  type="monotone"
                  stroke="#e1f"
                  strokeWidth={4}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                /> */}
                 
                <Tooltip 
                  formatter={(value: number) => value.toFixed(2)}
                  cursor={{ fill: 'none '}}
                  contentStyle={{borderRadius: "8px", opacity: 0.8}}
                  labelStyle={{color: "#1f1f24", fontWeight: 600 }}
                  animationDuration={0} 
                />
              </LineChart>
            </ResponsiveContainer>
          </S.ChartContainer>
        </Card>          
        
      </S.Main>
    </>
  )
}