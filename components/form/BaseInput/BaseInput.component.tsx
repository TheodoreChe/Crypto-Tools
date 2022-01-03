import React, { FC, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import { actionElement } from '@/constants/styles'
import ErrorMessage from '@/components/ErrorMessage'
import LabelComponent from '@/components/form/Label'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label?: string
  register: UseFormRegister<any>
  validations?: Record<string, any>
  errors?: Record<string, any>
}

const InputComponent = styled.input`
  ${actionElement};
  display: block;
  width: 100%;
  margin: 1.25rem 0 0.75rem;
  &:focus {
    outline: none;
    border-color: var(--blue);
  }
`

const BaseInput: FC<InputProps> = ({ label, name, errors, validations, register, ...rest }) => {
  return (
    <LabelComponent>
      {label}
      <InputComponent {...register(name, validations)} {...rest} />

      <ErrorMessage name={name} errors={errors} />
    </LabelComponent>
  )
}

export default BaseInput
