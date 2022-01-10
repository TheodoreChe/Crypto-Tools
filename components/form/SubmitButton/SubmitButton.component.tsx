import React from 'react'
import styled from 'styled-components'
import { actionElement } from '@/constants/styles'

const SubmitButton = styled.input`
  ${actionElement};
  background: transparent;
  cursor: pointer;
  padding: 1rem 3.75rem;
  &:hover {
    background-color: var(--white);
  }
`

export default SubmitButton
