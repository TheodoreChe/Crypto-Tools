import { FC } from 'react'
import styled, { css } from 'styled-components'
import { actionElement, buttonElement } from '@/constants/styles'

const ButtonComponent = styled.button<{ disabled?: boolean }>`
  ${buttonElement};

  color: ${({ disabled }) => (disabled ? 'var(--gray)' : 'var(--black)')};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};

  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
    `};
`

export default ButtonComponent
