import { ReactNode, FC } from 'react'

type PageMainProps = {
  children: ReactNode
}

const PageMain: FC<PageMainProps> = ({ children }) => {
  return <>{children}</>
}

export default PageMain
