import styled from 'styled-components'
import { GlobalStyle } from '../styles/global'
import SignIn from './signin'

const Title = styled.h1`
  font-size: 50px;
`

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <SignIn />
    </>
  )
}
