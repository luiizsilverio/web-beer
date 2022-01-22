import { keyframes } from 'styled-components'

// animation: ${animacao_crescer} 0.2s linear;  
export const animacao_crescer = keyframes`
  from {
    transform: scale(.95);
    opacity: 0.8;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// animation: ${animacao_para_direita} 1s;
export const animacao_para_direita = keyframes`
	from {
		opacity: 0;
		transform: translateX(-20px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

// animation: ${animacao_para_esquerda} 1s;
export const animacao_para_esquerda = keyframes`
	from {
		opacity: 0;
		transform: translateX(20px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

/* animation: ${animacao_shake} 0.5s linear; */
export const animacao_shake = keyframes`
10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }  
`;

/* animation: ${ animacao_balanca } 0.3s ease-in-out; */
export const animacao_balanca = keyframes`
25% {
    transform: rotate(-10deg);
  }
  
  50% {
    transform: rotate(10deg);
  }

  75% {
    transform: rotate(-10deg);
  }

  100% {
    transform: rotage(0deg);
  }  
`;

// animation: ${animacao_subir} 0.5s ease-out;
export const animacao_aparecer = keyframes`
  from {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
`;

export const animacao_desaparecer = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const animacao_subir = keyframes`
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;
