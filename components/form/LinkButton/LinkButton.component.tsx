import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LinkProps } from 'next/dist/client/link'
import styled, { css } from 'styled-components'
import { buttonElement } from '@/constants/styles'

type ButtonProps = {
  disabled?: boolean
  active?: boolean
}

type LinkButtonProps = LinkProps & ButtonProps

const LinkButtonComponent = styled.a<ButtonProps>`
  ${buttonElement};

  color: ${({ disabled }) => (disabled ? 'var(--gray)' : 'var(--black)')};

  ${({ active }) =>
    active &&
    css`
      background-color: #fff;
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};

  ${({ disabled, active }) =>
    !disabled &&
    !active &&
    css`
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
    `};
`

const LinkButton: FC<LinkButtonProps> = ({ children, href, disabled, ...rest }) => {
  const router = useRouter()
  return (
    <Link href={href}>
      <LinkButtonComponent active={router.pathname === href} disabled={disabled}>
        {children}
      </LinkButtonComponent>
    </Link>
  )
}

export default LinkButton
