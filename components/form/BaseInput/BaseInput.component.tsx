import React, { FC, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import { actionElement } from '@/constants/styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label?: string
  register: UseFormRegister<Record<string, any>>
}

const LabelComponent = styled.label`
  display: block;
  position: relative;
  font-size: 0.875rem;
  font-weight: bold;
`

const InputComponent = styled.input`
  ${actionElement};
  display: block;
  width: 100%;
  margin: 0.375rem 0 1.25rem;
  &:focus {
    outline: none;
    border-color: var(--blue);
  }
`

const BaseInput: FC<InputProps> = ({ label, name, register, ...rest }) => {
  return (
    <LabelComponent>
      {label}
      <InputComponent {...register(name)} {...rest} />
    </LabelComponent>
  )
}

export default BaseInput
