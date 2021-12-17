import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Page from '@/components/Page'
import Grid from '@/components/Grid'
import styled from 'styled-components'
import Header from '@/components/Header'
import Structure from '@/components/Structure'
import Form from '@/components/Form'
import { usePropertiesContext } from '../state/Properties'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 60px;
`

const Home: NextPage = () => {
  const { state } = usePropertiesContext()
  const { properties } = state
  return (
    <Page>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column lg={3}>
              <Header black center border>
                <h1>Crypto Tools</h1>
              </Header>
            </Grid.Column>
            <Grid.Column lg={5} xl={6}>
              <Header>
                <h2>Create New Option</h2>
              </Header>
              <Form />
            </Grid.Column>
            <Grid.Column lg={4} xl={3}>
              <Header border>
                <h2>Structure</h2>
              </Header>
              <Structure properties={properties} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Page>
  )
}

export default Home
