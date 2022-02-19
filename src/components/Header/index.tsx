import * as S from './styles'
import { useBeerContext } from '@/contexts';
import MenuButton from '../MenuButton'
import { ReactChild } from 'react';

type HeaderProps = {
  title: string,
  children?: React.ReactNode
}

function Header({ title, children }: HeaderProps) {
  const { menuOpen, toggleMenu } = useBeerContext()

  return (
    <S.Container id="myheader">
      {
        !menuOpen && <MenuButton icon="Menu" onClick={ toggleMenu } />
      }

      <h1>{ title }</h1>

      <div className="controls">
        { children }
      </div>
    </S.Container>
  )
}

export default Header
