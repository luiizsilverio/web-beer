import React, { useCallback, useState } from 'react'
import { People } from '@styled-icons/ionicons-solid'
import { People as People_Outline } from '@styled-icons/ionicons-outline'
import { Flag } from '@styled-icons/entypo'

import * as S from './styles'

interface Props {
  numMesa: number
  ocupado: boolean
  fechar?: boolean
  width?: number
  height?: number
  onPress?: () => void
}

export function Mesa({
  numMesa,
  ocupado,
  fechar = false,
  width = 100,
  height = 100,
  onPress = () => {}
}: Props){

  const mesa = numMesa.toString().padStart(2, '0');

  const icone = useCallback(() => {
    if (fechar) {
      return (
        <Flag
          size={32}
          color={ 'var(--black)' }
        />
      )
    }

    if (ocupado) {
      return (
        <People
          size={32}
          color={ 'var(--black)' }
        />
      )
    }

    return (
      <People_Outline
        size={32}
        color={ 'var(--black)' }
      />
    )

  }, [])

    return (
      <S.Button
        ocupado={ ocupado }
        fechar={ fechar }
        width={ width }
        height={ height }
        onPress={ onPress }
      >
        {
          icone()
        }
        <h2>{ mesa }</h2>
      </S.Button>
    )
}

