import MenuButton from '../MenuButton'
import * as S from './styles'

type Props = {
  title: string
  showMenuButton?: boolean
  children?: React.ReactNode
}

export default function Header({ title, showMenuButton = true, children }: Props) {
  return (
    <S.Container>
      {
        showMenuButton && <MenuButton icon="Menu" onClick={() => {}} />
      }
      
      <h1>{ title }</h1>

      { children }

    </S.Container>
  )
}