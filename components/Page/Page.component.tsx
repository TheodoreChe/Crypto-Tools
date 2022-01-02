import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { DEFAULT_DESCRIPTION, DEFAULT_FOOTER, DEFAULT_TITLE } from './page.constants'
import Grid from '@/components/Grid'
import Header from '@/components/Header'
import LeftMenu from '@/components/LeftMenu'
import Structure from '@/components/Structure'
import styled from 'styled-components'
import { useAppSelector } from '@/state/hooks'
import { getCollectionName } from '@/state/collection'

type PageProps = {
  children: ReactNode
  title?: string
  description?: string
  footer?: string
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: var(--gap);
  max-width: 1400px;
  margin: 0 auto;
`

const Page: FC<PageProps> = ({
  children,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  footer = DEFAULT_FOOTER,
}) => {
  const collectionName = useAppSelector(getCollectionName)
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <main>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column lg={3}>
                <Header black center border>
                  <h1>imgMIXER</h1>
                </Header>
                <LeftMenu />
              </Grid.Column>
              <Grid.Column lg={5} xl={6}>
                {children}
              </Grid.Column>
              <Grid.Column lg={4} xl={3}>
                <Header border>
                  <h2>{collectionName ?? 'Structure'}</h2>
                </Header>
                <Structure />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Page
