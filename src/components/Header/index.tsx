import * as S from './styles'
import { useBeerContext } from '@/contexts';
import MenuButton from '../MenuButton'

type Props = {
  title: string
  children?: React.ReactNode
}

export default function Header({ title, children }: Props) {
  const { menuOpen, toggleMenu } = useBeerContext()

  return (
    <S.Container id="myheader">
      {
        !menuOpen && <MenuButton icon="Menu" onClick={ toggleMenu } />
      }

      <h1>{ title }</h1>

      { children }

    </S.Container>
  )
}