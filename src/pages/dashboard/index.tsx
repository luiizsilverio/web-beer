import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

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

const data: IData[] = [
  {
    name: "Chopp Pilsen",
    value: 50,
    percent: 50,
    color: 'yellow'
  },
  {
    name: "Chopp Weiss",
    value: 30,
    percent: 30,
    color: 'blue'
  },
  {
    name: "Porcao Amendoim",
    value: 20,
    percent: 20,
    color: 'red'
  }
]

export default function Dashboard() {
  return (
    <>
      <Header title="Dashboard" />
      <S.Main>
        <S.CardContainer>
          <Card title='Total vendido R$'>
          </Card>

          <Card title='Produtos mais vendidos'>
            {/* <S.LegendContainer /> */}
            <S.ChartContainer>
              <ResponsiveContainer>
                <PieChart>
                  <Pie 
                    data={ data }
                    dataKey="value"
                    labelLine={false}
                  >
                    {
                      data.map((item) => (
                        <Cell key={ item.name } fill={ item.color } />
                      ))
                    }
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </S.ChartContainer>
          </Card>
        </S.CardContainer>
        
        <Card title='Evolução de Vendas'>
        </Card>          
        
      </S.Main>
    </>
  )
}