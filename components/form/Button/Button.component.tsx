import { FC } from 'react'
import styled from 'styled-components'
import { actionElement } from "@/constants/styles";

const ButtonComponent = styled.button`
  ${actionElement};
  margin-top: -1px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`

export default ButtonComponent
