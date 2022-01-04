import React, { FC, useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled, { css } from 'styled-components'
import Input from '@/components/form/BaseInput'
import FileInput from '@/components/form/FileInput'
import Submit from '@/components/form/SubmitButton'
import Header from '@/components/Header'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { addOption, editOption, AddOptionData, getCollectionName, getOptionById } from '@/state/collection'
import labels from '@/constants/labels'
import { useRouter } from 'next/router'

type OptionProps = {
  id?: string | undefined
}

const AddOptionComponent = styled.div<{ disabled?: boolean }>`
  padding: var(--gap);

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};
`

const Option: FC<OptionProps> = ({ id }) => {
  const router = useRouter()
  const collectionName = useAppSelector(getCollectionName)
  const option = useAppSelector(getOptionById(id))
  const values = option
    ? {
        propertyName: option.propertyName,
        optionName: option.name,
      }
    : undefined

  const methods = useForm()

  useEffect(() => {
    methods.reset(values)
  }, [methods.reset, values?.propertyName, values?.optionName])

  const resetForm = useCallback(
    (newValues?: any) => {
      methods.reset(newValues)
    },
    [methods.reset],
  )

  const dispatch = useAppDispatch()

  const onSubmit = (data: AddOptionData) => {
    if (id) {
      router.push('/add_option')
      dispatch(editOption({ ...data, id }))
      resetForm()
    } else if (data.propertyName != '') {
      dispatch(addOption(data))
      resetForm()
    }
  }

  const isDisabled = collectionName == null

  return (
    <>
      <Header>
        <h2>{Boolean(id) ? labels.edit_option_title : labels.add_option_title}</h2>
      </Header>
      <AddOptionComponent disabled={isDisabled}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            <Input
              errors={methods.formState.errors}
              label="Property"
              name="propertyName"
              placeholder="e.g. Background"
              register={methods.register}
              disabled={Boolean(id)}
              type="text"
              validations={{ required: 'Please enter property name.' }}
            />
            <Input
              errors={methods.formState.errors}
              label="Option"
              name="optionName"
              placeholder="e.g. Red"
              register={methods.register}
              type="text"
              validations={{ required: 'Please enter option name.' }}
            />
            <FileInput
              label="Picture"
              name="fileList"
              validations={{ required: !id && 'Please app picture.' }}
              accept="image/png"
            />

            <Submit type="submit" value={Boolean(id) ? labels.edit_option_title : labels.add_option_title} />
          </form>
        </FormProvider>
      </AddOptionComponent>
    </>
  )
}

export default Option
