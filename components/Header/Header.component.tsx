import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
    black?: boolean
    center?: boolean
    border?: boolean
}

const Header = styled.div<Props>`
  display: flex;
  align-items: center;
  height: 6rem;
  padding: 0 2.5rem;

  ${({ black }) => black && `
    background-color: var(--black);
    color: var(--white);
  `}

  ${({ center }) => center && `
    justify-content: center;
  `}

  ${({ border }) => border && `
    border: thin solid var(--black);
  `}
`

export default Header
