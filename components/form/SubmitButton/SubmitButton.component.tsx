import React from 'react'
import styled from 'styled-components'
import { actionElement } from '@/constants/styles'

const SubmitButton = styled.input`
  ${actionElement};
  background: transparent;
  cursor: pointer;
  padding: 1rem 3.75rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`

export default SubmitButton
