import { FC, ReactNode } from 'react'

type PageActionsProps = {
  children: ReactNode
}

const PageActions: FC<PageActionsProps> = ({ children }) => {
  return <>{children}</>
}

export default PageActions
