import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Input from '@/components/form/BaseInput'
import Submit from '@/components/form/SubmitButton'
import Header from '@/components/Header'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { addCollection, AddCollectionData, deleteCollection, getCollectionName } from '@/state/collection'
import Button from '@/components/form/Button'
import { layoutName, setLayout } from '@/state/layout'

const WelcomeScreenComponent = styled.div`
  padding: var(--gap);
`

const ButtonsComponent = styled.div`
  display: flex;
  justify-content: space-between;
`

const MessageComponent = styled.div`
  margin-bottom: var(--gap);
`

const WelcomeScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const dispatch = useAppDispatch()
  const collectionName = useAppSelector(getCollectionName)

  const resetForm = useCallback(() => {
    reset()
  }, [reset])

  const onSubmit = (data: AddCollectionData) => {
    if (data.collectionName != '') {
      dispatch(addCollection(data))
      resetForm()
      dispatch(setLayout(layoutName.ADD_OPTION))
    }
  }

  const newCollectionHandle = () => {
    dispatch(deleteCollection())
  }

  const continueHandle = () => {
    dispatch(setLayout(layoutName.ADD_OPTION))
  }

  if (collectionName) {
    return (
      <>
        <Header>
          <h2>New Collection</h2>
        </Header>
        <WelcomeScreenComponent>
          <MessageComponent>
            Do you want to delete <b>{collectionName}</b>?
          </MessageComponent>

          <ButtonsComponent>
            <Button onClick={newCollectionHandle}>Yes, Crete New Collection</Button>
            <Button onClick={continueHandle}>No, Continue work</Button>
          </ButtonsComponent>
        </WelcomeScreenComponent>
      </>
    )
  }

  return (
    <>
      <Header>
        <h2>New Collection</h2>
      </Header>
      <WelcomeScreenComponent>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Input
            errors={errors}
            label="Name"
            name="collectionName"
            placeholder="Enter a collection name"
            register={register}
            type="text"
            validations={{ required: 'Please enter collection name.' }}
          />

          <Submit type="submit" value="Create Collection" />
        </form>
      </WelcomeScreenComponent>
    </>
  )
}

export default WelcomeScreen
