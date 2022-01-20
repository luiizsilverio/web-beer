import Link from 'next/link'
import { Beer } from '@styled-icons/ionicons-solid'
import { Dashboard } from '@styled-icons/material-rounded'
import { ExitToApp } from '@styled-icons/material-rounded' //@styled-icons/material/ExitToApp
import { Calculator } from '@styled-icons/fluentui-system-filled'
import { AttachMoney } from '@styled-icons/material';

import * as S from './styles'

export default function Aside() {
  return (
    <S.Container>
      <S.TitleContainer>
        <Beer size={50} color='#ff872c'/>
        <S.Title>
          <h1>My-Beer</h1>
        </S.Title>
      </S.TitleContainer>

      <S.Menu>
        <Link href={"/dashboard"}>
          <S.MenuLink>
            <Dashboard size={30} />
            Dashboard
          </S.MenuLink>
        </Link>

        <Link href={"/fechar"}>
          <S.MenuLink>  
            <Calculator size={30} />
            Fechar Conta
          </S.MenuLink>
        </Link>
        
        <Link href={"/vendas"}>
          <S.MenuLink>  
            <AttachMoney size={30} />
            Rel. de Vendas
          </S.MenuLink>
        </Link>

        <Link href={"/signin"}>
          <S.MenuLink>      
            <ExitToApp size={30} />    
            Sair
          </S.MenuLink>
        </Link>
      </S.Menu>
    </S.Container>
  )
}  