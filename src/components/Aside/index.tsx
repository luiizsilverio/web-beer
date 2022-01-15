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
          <h1>Web-Beer</h1>
        </S.Title>
      </S.TitleContainer>

      <S.Menu>
        <S.MenuLink href="/dashboard">  
          <Dashboard size={30} />
          Dashboard
        </S.MenuLink>

        <S.MenuLink href="/fechar">  
          <Calculator size={30} />
          Fechar Conta
        </S.MenuLink>
        
        <S.MenuLink href="/fechar">  
          <AttachMoney size={30} />
          Relatório
        </S.MenuLink>

        <S.MenuLink href="/signin">      
          <ExitToApp size={30} />    
          Sair
        </S.MenuLink>
      </S.Menu>
    </S.Container>
  )
}  