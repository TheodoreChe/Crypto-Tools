import React, { ChangeEvent, ChangeEventHandler, FC, InputHTMLAttributes, useState } from 'react'
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

const FileComponent = styled.div`
  border: thin dashed var(--black);
  height: 3.75rem;
  margin: 0.375rem 0 1.25rem;
  border-radius: var(--radius);
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`

const InputComponent = styled.input`
  ${actionElement};
  display: block;
  margin: 0.375rem 0 1.25rem;
  position: absolute;
  top: 0;
  width: 0;
  opacity: 0;
  pointer-events: none;
  &:focus {
    outline: none;
    border-color: var(--blue);
    + ${FileComponent} {
      border-color: var(--blue);
    }
  }
`

const FileInput: FC<InputProps> = ({ label, name, register, ...rest }) => {
  const [fileName, setFileName] = useState<string | undefined>(undefined)
  const onChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }
  return (
    <LabelComponent>
      {label}
      <InputComponent {...register(name)} {...rest} onChange={onChange} />
      <FileComponent>{fileName}</FileComponent>
    </LabelComponent>
  )
}

export default FileInput
