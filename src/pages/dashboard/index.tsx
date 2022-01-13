import * as S from './styles'
import Aside from '@/components/Aside'

export default function Dashboard() {
  return (
    <S.Grid>
      <S.Header />
      <Aside />
      <S.Main>
        <S.Title>
          <h1>Dashboard</h1>
        </S.Title>
        <S.Card />
        <S.Card />
      </S.Main>
    </S.Grid>
  )
}