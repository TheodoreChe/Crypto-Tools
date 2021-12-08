import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { DEFAULT_DESCRIPTION, DEFAULT_FOOTER, DEFAULT_TITLE } from './page.constants'

type PageProps = {
  children: ReactNode
  title?: string
  description?: string
  footer?: string
}

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

      <footer>{footer}</footer>
    </>
  )
}

export default Page
