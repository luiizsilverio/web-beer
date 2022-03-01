import * as S from './styles'

type Props = {
  title: string
  heightPx?: number
  widthPx?: number
  valorR$?: boolean
  children?: React.ReactNode
}

export default function Header({
  title,
  heightPx = 190,
  widthPx = 0,
  valorR$ = false,
  children
}: Props) {

  return (
    <S.Container className="my-card">
      <S.TitleContainer>
        <S.Title>
          <h2>{ title }</h2>
          { valorR$ && <S.RealBox>R$</S.RealBox> }
        </S.Title>
      </S.TitleContainer>

      <S.Content  heightPx={ heightPx } widthPx={ widthPx }>
        { children }
      </S.Content>
    </S.Container>
  )
}
