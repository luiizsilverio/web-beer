import * as S from './styles'

type Props = {
  title: string
  children?: React.ReactNode
}

export default function Header({ title, children }: Props) {
  return (
    <S.Container>
      <S.Title>
        <h2>{ title }</h2>
      </S.Title>

      <S.Content>
        { children }
      </S.Content>
    </S.Container>
  )
}