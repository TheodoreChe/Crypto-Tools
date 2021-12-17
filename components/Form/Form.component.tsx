import React from 'react'
import FormOption from '@/components/Form/FormOption.component'
import styled from 'styled-components'

const FormComponent = styled.div`
  padding: var(--gap);
`

const Form = () => {
  return (
    <FormComponent>
      <FormOption />
    </FormComponent>
  )
}

export default Form
