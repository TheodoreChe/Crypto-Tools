import React, { useEffect } from 'react'
import Modal from 'styled-react-modal'
import { FormProvider, useForm } from 'react-hook-form'
import { editOption, getModalId, getOptionById, Option, setModalId } from '@/state/collection'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import Input from '@/components/form/BaseInput/BaseInput.component'
import { nameValidations, rarityValidations } from './editCollection.constants'
import FileInput from '@/components/form/FileInput'
import Submit from '@/components/form/SubmitButton/SubmitButton.component'
import labels from '@/constants/labels'
import Button from '@/components/form/Button'
import styled from 'styled-components'

const StyledModal = Modal.styled`
  width: 30rem;
  padding: 2rem;
  background-color: white;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

/**
 * EditOptionModal - A modal for editing an option.
 */
function EditOptionModal(): JSX.Element {
  const methods = useForm()
  const dispatch = useAppDispatch()
  const id = useAppSelector(getModalId)
  const option = useAppSelector(getOptionById(id))

  useEffect(() => {
    methods.reset(option)
  }, [methods.reset, option])

  const closeModal = () => {
    dispatch(setModalId())
  }

  const onSubmit = ({ id, propertyName, name, fileList, rarity }: any) => {
    dispatch(editOption({ id, propertyName, optionName: name, fileList, rarity }))
    dispatch(setModalId())
  }

  return (
    <StyledModal isOpen={id != null} onBackgroundClick={closeModal} onEscapeKeydown={closeModal}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
          <Input
            errors={methods.formState.errors}
            label="Name"
            name="name"
            placeholder="e.g. Red"
            register={methods.register}
            type="text"
            validations={nameValidations}
          />
          <Input
            errors={methods.formState.errors}
            label="Rarity"
            name="rarity"
            placeholder="e.g. 100"
            register={methods.register}
            type="text"
            validations={rarityValidations}
          />
          <FileInput
            label="Image"
            name="fileList"
            validations={{ required: !id && 'Please app picture.' }}
            accept="image/png"
          />
          <ButtonsWrapper>
            <Submit type="submit" value={labels.edit_option_title} />
            <Button type="button" onClick={closeModal}>
              Close
            </Button>
          </ButtonsWrapper>
        </form>
      </FormProvider>
    </StyledModal>
  )
}

export default EditOptionModal
