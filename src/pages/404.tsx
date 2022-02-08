import Lottie from 'react-lottie-player'
import caveira from '@/assets/loading-skull.json'

import * as S from '@/styles/404.styles'

export default function NotFound() {
  return (
    <S.Container>
        <h1>Página não encontrada</h1>
        <p>Page not found</p>
        
        <Lottie
          loop={true}
          play={true}
          animationData={caveira}
          className="lottie"
        />
    </S.Container>
  )
}