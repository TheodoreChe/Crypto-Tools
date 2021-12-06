import { FC, ReactNode } from 'react'

type PageInfoProps = {
  children: ReactNode
}

const PageInfo: FC<PageInfoProps> = ({ children }) => {
  return <>{children}</>
}

export default PageInfo
