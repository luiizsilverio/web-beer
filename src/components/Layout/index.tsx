import { ReactNode } from 'react'

import * as S from './styles'
import Aside from '@/components/Aside'
import Header from '@/components/Header'


type Props = {
  title: string
  children: ReactNode
}

export default function Layout({ title, children }: Props) {
  return (
    <S.Grid>
      {/* <Header title={ title }></Header>  */}

      <Aside />

      <S.Main>        
        { children }
      </S.Main>
    </S.Grid>
  )
}