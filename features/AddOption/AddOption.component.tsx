import React from 'react'
import { useForm } from 'react-hook-form'
import styled, { css } from 'styled-components'
import Input from '@/components/form/BaseInput'
import File from '@/components/form/FileInput'
import Submit from '@/components/form/SubmitButton'
import Header from '@/components/Header'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { addOption, AddOptionData, getCollectionName } from '@/state/collection'
import labels from '@/constants/labels'

const AddOptionComponent = styled.div<{ disabled?: boolean }>`
  padding: var(--gap);

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};
`

const AddOption = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const collectionName = useAppSelector(getCollectionName)
  const dispatch = useAppDispatch()
  const onSubmit = (data: AddOptionData) => {
    if (data.propertyName != '') {
      dispatch(addOption(data))
    }
  }

  const isDisabled = collectionName == null

  return (
    <>
      <Header>
        <h2>{labels.add_option_title}</h2>
      </Header>
      <AddOptionComponent disabled={isDisabled}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Input
            errors={errors}
            label="Property"
            name="propertyName"
            placeholder="Enter a new or use an existing property name"
            register={register}
            type="text"
            validations={{ required: 'Please enter property name.' }}
          />
          <Input
            errors={errors}
            label="Option"
            name="optionName"
            placeholder="Enter option name"
            register={register}
            type="text"
            validations={{ required: 'Please enter option name.' }}
          />
          <File
            errors={errors}
            type="file"
            label="Picture"
            register={register}
            name="fileList"
            validations={{ required: 'Please app picture.' }}
            accept="image/png"
          />

          <Submit type="submit" value="Add Option" />
        </form>
      </AddOptionComponent>
    </>
  )
}

export default AddOption
