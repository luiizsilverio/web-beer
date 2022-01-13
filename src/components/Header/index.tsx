import * as S from './styles'

type Props = {
  title: string
  children: React.ReactNode
}

export default function Header({ title, children }: Props) {
  return (
    <S.Container>
      <h1>{ title }</h1>
      { children }
    </S.Container>
  )
}