import React, { FC, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import LabelComponent from '@/components/form/Label'
import { useFormContext } from 'react-hook-form'
import ErrorMessage from '@/components/ErrorMessage'
import styled from 'styled-components'

type FileInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string
  label?: string
  validations?: Record<string, any>
}

const FileComponent = styled.div<{ isDragActive: boolean }>`
  border: ${({ isDragActive }) => (isDragActive ? '2px solid var(--blue)' : '1px dashed var(--black)')};
  height: 7.5rem;
  margin: 0 0 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--white);
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

const FileInput: FC<FileInputProps> = (props) => {
  const { name, label = name } = props
  const {
    register,
    unregister,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()
  const files: File[] = watch(name)
  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  const onDrop = useCallback(
    (droppedFiles) => {
      setValue(name, droppedFiles, { shouldValidate: true })
    },
    [setValue, name],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
  })

  return (
    <>
      <LabelComponent htmlFor={name}>{label}</LabelComponent>
      <div {...getRootProps()}>
        <InputComponent {...props} id={name} {...getInputProps()} />
        <FileComponent isDragActive={isDragActive}>
          {!!files?.length ? (
            files.map((file) => {
              return <div key={file.name}>{file.name}</div>
            })
          ) : (
            <span>Drop the files here ...</span>
          )}
        </FileComponent>
      </div>
      <ErrorMessage name={name} errors={errors} />
    </>
  )
}

export default FileInput
