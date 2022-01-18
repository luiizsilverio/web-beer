import * as S from './styles'

type Props = {
  title: string
  heightPx?: number
  widthPx?: number
  children?: React.ReactNode
}

export default function Header({ 
  title, 
  heightPx = 190, 
  widthPx = 0,
  children 
}: Props) {
  return (
    <S.Container>
      <S.Title>
        <h2>{ title }</h2>
      </S.Title>

      <S.Content  heightPx={ heightPx } widthPx={ widthPx }>
        { children }
      </S.Content>
    </S.Container>
  )
}