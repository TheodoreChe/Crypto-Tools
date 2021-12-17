import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '@/components/Input'
import Submit from '@/components/Submit'
import { usePropertiesContext } from '@/state/Properties'
import { PropertiesActions } from '@/state/Properties.reducer'

const FormOption = () => {
  const { register, handleSubmit } = useForm()
  const { dispatch } = usePropertiesContext()
  const onSubmit = (data: any) => {
    if (data.propertyName != "") {
      dispatch({
        type: PropertiesActions.ADD_OPTION,
        data,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Input
        type="text"
        label="Property"
        placeholder="Enter a new or use an existing property name e.g. Kind of Hat"
        register={register}
        name="propertyName"
      />
      <Input
        type="text"
        label="Option"
        placeholder="Enter option name e.g. Baseball Cap"
        register={register}
        name="optionName"
      />
      <Input type="file" label="Image" register={register} name="image" />

      <Submit type="submit" value="Add Option" />
    </form>
  )
}

export default FormOption
