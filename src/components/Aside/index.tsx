import Link from 'next/link'
import { Beer } from '@styled-icons/ionicons-solid'
import { Dashboard, ExitToApp } from '@styled-icons/material-rounded'
import { Calculator } from '@styled-icons/fluentui-system-filled'
import { AttachMoney } from '@styled-icons/material';

import * as S from './styles'
import { useBeerContext } from '@/contexts';
import MenuButton from '../MenuButton'

export default function Aside() {
  const { menuOpen, toggleMenu, logout } = useBeerContext()

  return (
    <S.Container menuOpen={ menuOpen }>
      <S.TitleContainer>

        <Beer size={50} color={"var(--orange)"} />

        <S.Title>
          <h1>My-Beer</h1>
        </S.Title>
      </S.TitleContainer>

      {
        menuOpen &&
          <S.Button>
            <MenuButton icon="Close" onClick={() => toggleMenu('close') } />
          </S.Button>
      }

      <S.Menu menuOpen={ menuOpen } onClick={() => toggleMenu('close') }>
        <Link href={"/dashboard"}>
          <S.MenuLink>
            <Dashboard size={30} />
            Dashboard
          </S.MenuLink>
        </Link>

        <Link href={"/mesas"}>
          <S.MenuLink>
            <Calculator size={30} />
            Fechar Conta
          </S.MenuLink>
        </Link>

        <Link href={"/vendas"}>
          <S.MenuLink>
            <AttachMoney size={30} />
            Rel. Vendas
          </S.MenuLink>
        </Link>

        <Link href={"/signin"}>
          <S.LinkButton type="button" onClick={logout}>
            <ExitToApp size={30} />
            Sair
          </S.LinkButton>
        </Link>
      </S.Menu>
    </S.Container>
  )
}