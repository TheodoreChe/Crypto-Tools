import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Input from '@/components/form/BaseInput'
import File from '@/components/form/FileInput'
import Submit from '@/components/form/SubmitButton'
import { usePropertiesContext } from '@/state/Properties'
import { PropertiesActions } from '@/state/Properties.reducer'

const AddOptionComponent = styled.div`
  padding: var(--gap);
`

const AddOption = () => {
  const { register, handleSubmit } = useForm()
  const { dispatch } = usePropertiesContext()
  const onSubmit = (data: any) => {
    if (data.propertyName != '') {
      dispatch({
        type: PropertiesActions.ADD_OPTION,
        data,
      })
    }
  }

  return (
    <AddOptionComponent>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Input
          type="text"
          label="Property"
          placeholder="Enter a new or use an existing property name"
          register={register}
          name="propertyName"
        />
        <Input type="text" label="Option" placeholder="Enter option name" register={register} name="optionName" />
        <File type="file" label="Picture" register={register} name="fileList" />

        <Submit type="submit" value="Add Option" />
      </form>
    </AddOptionComponent>
  )
}

export default AddOption
