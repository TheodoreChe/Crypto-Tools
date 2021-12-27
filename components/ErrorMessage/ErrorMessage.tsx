import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface ErrorMessageProps {
    errors?: Record<string, any>
    name: string
}

const ErrorMessageComponent = styled.span`
  font-weight: 300;
  color: red;
`

const ErrorMessage: FC<ErrorMessageProps> = ({errors, name}) => {
    const errorMessage = errors?.[name]?.message
    return <ErrorMessageComponent>{errorMessage}</ErrorMessageComponent>
}

export default ErrorMessage
