import Lottie from 'react-lottie'
import caveira from '@/assets/loading-skull.json'

import * as S from './styles'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: caveira,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}

export function Loading() {
  return (
    <S.Container>
      {/* <img src="/skull.gif" alt="Caveira" width={300} /> */}
      <Lottie
        options={defaultOptions}
        height={250}
        width={250}
        className="lottie"
      />
    </S.Container>
  )
}
