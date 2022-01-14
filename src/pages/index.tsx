import styled from 'styled-components'

import SignIn from './signin'
import Layout from '@/components/Layout'
import Dashboard from './dashboard'

export default function Home() {
  return (
    <>
      <Layout>
        <Dashboard />
      </Layout>
      {/* <SignIn /> */}
    </>
  )
}
