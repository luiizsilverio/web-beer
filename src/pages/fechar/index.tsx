import * as S from './styles'
import Aside from '@/components/Aside'
import Header from '@/components/Header'

export default function Fechar() {
  return (
    <S.Grid>
      <Header title="Fechamento de Conta">
        <h1>xxxxx</h1>
      </Header>

      <Aside />

      <S.Main>        
        <S.Card />
        <S.Card />
        <S.Card />
      </S.Main>
    </S.Grid>
  )
}