import React, { ButtonHTMLAttributes  } from 'react'

import * as S from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color: string
  size?: number
  children: React.ReactNode;
}

export default function RoundButton({ color, size = 32, children, ...rest }: ButtonProps){
  return (
    <S.Button
      type="button"
      color={color}
      {...rest}
    >
      { children }
    </S.Button>
  )
}

