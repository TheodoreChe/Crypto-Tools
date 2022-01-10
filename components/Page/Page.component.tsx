import { FC, ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import Grid from '@/components/Grid'
import Header from '@/components/Header'
import LeftSidebar from '@/components/layout/LeftSidebar'
import RightSidebar from '@/components/layout/RightSidebar'
import { DEFAULT_DESCRIPTION, DEFAULT_FOOTER, DEFAULT_TITLE } from './page.constants'

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

const StyledColumn = styled(Grid.Column)`
  background: var(--white);
`

const LogoTitle = styled.h1`
  margin-left: 0.35rem;
`

const Page: FC<PageProps> = ({
  children,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  footer = DEFAULT_FOOTER,
}) => {
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
                  <Image src="/logo.png" width="33px" height="33px" />
                  <LogoTitle>GimmeImage</LogoTitle>
                </Header>
                <LeftSidebar />
              </Grid.Column>
              <Grid.Column lg={5} xl={6}>
                {children}
              </Grid.Column>
              <StyledColumn lg={4} xl={3}>
                <RightSidebar />
              </StyledColumn>
            </Grid.Row>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Page
