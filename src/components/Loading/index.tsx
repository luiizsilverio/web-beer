import Lottie from 'react-lottie-player'
import caveira from '@/assets/loading-skull.json'

import * as S from './styles'

export function Loading() {
  return (
    <S.Container>
      {/* <img src="/skull.gif" alt="Caveira" width={300} /> */}
      <Lottie
        loop={true}
        play={true}
        animationData={caveira}
        className="lottie"
      />
    </S.Container>
  )
}
