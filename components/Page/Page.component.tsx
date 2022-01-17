import { FC, ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import Header from '@/components/Header'
import LeftSidebar from '@/components/layout/LeftSidebar'
import { DEFAULT_DESCRIPTION, DEFAULT_FOOTER, DEFAULT_TITLE } from './page.constants'

type PageProps = {
  children: ReactNode
  title?: string
  description?: string
  footer?: string
}

const PageComponent = styled.div`
  height: 100vh;
  width: 100vw;
  padding: var(--gap);
  margin: 0 auto;
  display: flex;
`

const PageColumnComponent = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
`

const PageSidebarComponent = styled(PageColumnComponent)`
  width: 20rem;
  flex-grow: 0;
  flex-shrink: 0;
`

const PageContentComponent = styled(PageColumnComponent)`
  flex-grow: 1;
  flex-shrink: 1;
  width: 0;
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
        <PageComponent>
          <PageSidebarComponent>
            <Header black center border>
              <Image src="/logo.png" width="33px" height="33px" />
              <LogoTitle>GimmeImage</LogoTitle>
            </Header>
            <LeftSidebar />
          </PageSidebarComponent>
          <PageContentComponent>{children}</PageContentComponent>
        </PageComponent>
      </main>
    </>
  )
}

export default Page
