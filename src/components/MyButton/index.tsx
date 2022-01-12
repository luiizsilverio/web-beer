import { ButtonHTMLAttributes } from "react";

import * as S from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function MyButton({children, ...rest}: ButtonProps) {  
  return (
    <S.ButtonContainer 
      className="button" {...rest}
    >
			{children}
		</S.ButtonContainer>
  )
}