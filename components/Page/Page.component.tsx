import { memo, ReactNode, FC } from 'react'
import Head from 'next/head'
import PageInfo from './PageInfo.component'
import PageMain from './PageMain.component'
import PageActions from './PageActions.component'
import { DEFAULT_DESCRIPTION, DEFAULT_FOOTER, DEFAULT_TITLE } from './page.constants'

type PageProps = {
  children: ReactNode
  title?: string
  description?: string
  footer?: string
}

interface PageComponent extends FC<PageProps> {
    Info: typeof PageInfo
    Main: typeof PageMain
    Actions: typeof PageActions
}

const Page: PageComponent = ({
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

      <footer>{footer}</footer>
    </>
  )
}

Page.Info = PageInfo
Page.Main = PageMain
Page.Actions = PageActions

export default Page
