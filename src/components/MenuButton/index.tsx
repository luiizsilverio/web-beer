// import { ReactNode } from 'react'
import { Menu } from '@styled-icons/ionicons-solid'
import { Close } from '@styled-icons/material'

import * as S from './styles'

type Props = {
  icon: 'Menu' | 'Close'
  onClick(): void
}

export default function MenuButton({ icon, onClick }: Props) {
  return (
    <S.Container onClick={onClick}>
      {
        icon === 'Menu' ? <Menu size={30} /> : <Close size={30} />
      }
    </S.Container>
  )
}