import styled from 'styled-components'
import { useFormContext } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import getByPath from '../../lib/resolvePath'

type BoardInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  validations?: Record<string, any>
}

const InputComponent = styled.input<{ isError: boolean }>`
  display: block;
  margin: -0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  background: transparent;
  border: none;
  width: calc(100% - 0.5rem);
  flex: 1;
  outline: none;
  border-radius: var(--radius);
  &:hover,
  &:active,
  &:focus {
    background-color: ${({ isError }) => (isError ? '#fff' : '#eee')};
  }
  ${({ isError }) =>
    isError &&
    `
      border: 1px solid red;
    `}
`

/**
 * BoardInput - A form input for a board
 */
function BoardInput({ name, validations = { required: true }, ...rest }: BoardInputProps): JSX.Element {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const error = getByPath(errors, name)
  const errorMessage = error?.message

  return (
    <InputComponent
      data-tip={errorMessage || ''}
      isError={Boolean(error)}
      type="text"
      {...register(name, validations)}
      {...rest}
    />
  )
}

export default BoardInput
