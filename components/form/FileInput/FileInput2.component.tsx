import React, { ChangeEvent, ChangeEventHandler, FC, InputHTMLAttributes, useState } from 'react'
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

const FileComponent = styled.div`
  border: thin dashed var(--black);
  height: 3.75rem;
  margin: 0.375rem 0 0.75rem;
  border-radius: var(--radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`

const InputComponent = styled.input`
  position: absolute;
  top: 0;
  width: 0;
  opacity: 0;
  pointer-events: none;
  &:focus {
    + ${FileComponent} {
      border-color: var(--blue);
    }
  }
`

const ErrorComponent = styled.span`
  font-weight: 300;
  color: red;
`

const FileInput: FC<InputProps> = ({ label, name, register, validations, errors, ...rest }) => {
  const [fileName, setFileName] = useState<string | undefined>(undefined)
  const onChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('ONCHANGE', event)
    const file = event.currentTarget.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <LabelComponent>
      {label}
      <InputComponent {...register(name, validations)} {...rest} onChange={onChange} />
      <FileComponent>{fileName}</FileComponent>
      <ErrorMessage name={name} errors={errors} />
    </LabelComponent>
  )
}

export default FileInput
