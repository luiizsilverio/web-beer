import React, { useCallback, ButtonHTMLAttributes  } from 'react'
import { People } from '@styled-icons/ionicons-solid'
import { People as People_Outline } from '@styled-icons/ionicons-outline'
import { Flag } from '@styled-icons/entypo'

import * as S from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  numMesa: number
  ocupado: boolean
  fechar?: boolean
  width?: number
  height?: number
}

export function Mesa({
  numMesa,
  ocupado,
  fechar = false,
  width = 100,
  height = 100,
  ...rest
}: ButtonProps){

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
        type="button"
        ocupado={ ocupado }
        fechar={ fechar }
        width={ width }
        height={ height }
        {...rest}
      >
        {
          icone()
        }
        <h2>{ mesa }</h2>
      </S.Button>
    )
}

