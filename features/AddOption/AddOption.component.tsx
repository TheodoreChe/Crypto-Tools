import React, { FC, useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import Select from 'react-select'
import Input from '@/components/form/BaseInput'
import FileInput from '@/components/form/FileInput'
import LabelComponent from '@/components/form/Label'
import Submit from '@/components/form/SubmitButton'
import Header from '@/components/Header'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { addOption, AddOptionData, editOption, getCollectionName, getOptionById } from '@/state/collection'
import labels from '@/constants/labels'

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

const options = [
  { value: 'common', label: 'Common (as often as possible)' },
  { value: 'uncommon', label: 'Uncommon (2 times less common)' },
  { value: 'rare', label: 'Rare (10 times less common)' },
]

const styles = {
  control: (styles: any) => ({
    ...styles,
    border: '1px solid #000',
    boxShadow: 'none',
    cursor: 'pointer',
    margin: '1.25rem 0 0.75rem',
    lineHeight: '1.75rem',
    padding: '.6rem',
    '&:hover': {},
  }),
}

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
            <LabelComponent>
              Rarity
              <Select defaultValue={options[0]} options={options} styles={styles} />
            </LabelComponent>

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
