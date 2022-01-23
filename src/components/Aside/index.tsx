import Link from 'next/link'
import { Beer } from '@styled-icons/ionicons-solid'
import { Dashboard, ExitToApp } from '@styled-icons/material-rounded'
import { Calculator } from '@styled-icons/fluentui-system-filled'
import { AttachMoney } from '@styled-icons/material';

import * as S from './styles'
import { useBeerContext } from '@/contexts';
import MenuButton from '../MenuButton'
import { useEffect } from 'react';

export default function Aside() {
  const { menuOpen, toggleMenu } = useBeerContext()
  
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
            <MenuButton icon="Close" onClick={ toggleMenu } />
          </S.Button>
      }    

      <S.Menu>
        <Link href={"/dashboard"}>
          <S.MenuLink onClick={ toggleMenu }>
            <Dashboard size={30} />
            Dashboard
          </S.MenuLink>
        </Link>

        <Link href={"/fechar"}>
          <S.MenuLink onClick={ toggleMenu }>  
            <Calculator size={30} />
            Fechar Conta
          </S.MenuLink>
        </Link>
        
        <Link href={"/vendas"}>
          <S.MenuLink onClick={ toggleMenu }>  
            <AttachMoney size={30} />
            Rel. de Vendas
          </S.MenuLink>
        </Link>

        <Link href={"/signin"}>
          <S.MenuLink onClick={ toggleMenu }>      
            <ExitToApp size={30} />    
            Sair
          </S.MenuLink>
        </Link>
      </S.Menu>
    </S.Container>
  )
}  