import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Page from '@/components/Page'
import Grid from '@/components/Grid'
import styled from 'styled-components'
import Header from '@/components/Header'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 60px;
`

const Home: NextPage = () => {
  return (
    <Page>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column md={3}>
              <Header black center border>
                <h1>Crypto Tools</h1>
              </Header>
            </Grid.Column>
            <Grid.Column md={5}>
              <h2>Your Collection</h2>
            </Grid.Column>
            <Grid.Column md={4}>
              <Header border>
                <h2>Layers</h2>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Page>
  )
}

export default Home
