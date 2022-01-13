import * as S from './styles'
import Aside from '@/components/Aside'
import Header from '@/components/Header'
import Card from '@/components/Card'

export default function Dashboard() {
  return (
    <>
      <Header title="Dashboard">aaa</Header>
      <S.Main>
        <S.CardContainer>
          <Card title='Total vendido R$'>
          </Card>
          <Card title='Produtos mais vendidos'>
          </Card>
        </S.CardContainer>
        
        <Card title='Evolução de Vendas'>
        </Card>

        <Card title='Relatório de Vendas'>
        </Card>              
        
      </S.Main>
    </>
  )
}