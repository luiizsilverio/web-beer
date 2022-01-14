import { ReactNode } from 'react'

import * as S from './styles'
import Aside from '@/components/Aside'
import Header from '@/components/Header'
import Content from '@/components/Content'


type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <S.Grid>
      <Aside />

      <Content>
        { children }
      </Content>
    </S.Grid>
  )
}