import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Input from '@/components/form/BaseInput'
import Submit from '@/components/form/SubmitButton'
import Header from '@/components/Header'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { useRouter } from 'next/router'
import { addCollection, AddCollectionData, deleteCollection, getCollectionName } from '@/state/collection'
import Button from '@/components/form/Button'
import labels from '@/constants/labels'

const NewCollectionComponent = styled.div`
  padding: var(--gap);
`

const ButtonsComponent = styled.div`
  display: flex;
  justify-content: space-between;
`

const MessageComponent = styled.div`
  margin-bottom: var(--gap);
`

const NewCollection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const dispatch = useAppDispatch()
  const collectionName = useAppSelector(getCollectionName)
  const router = useRouter()
  const resetForm = useCallback(() => {
    reset()
  }, [reset])

  const onSubmit = (data: AddCollectionData) => {
    if (data.collectionName != '') {
      resetForm()
      router.push('/add_option')
      dispatch(addCollection(data))
    }
  }

  const newCollectionHandle = () => {
    dispatch(deleteCollection())
  }

  const continueHandle = () => {
    router.push('/add_option')
  }

  if (collectionName) {
    return (
      <>
        <Header>
          <h2>{labels.new_collection_title}</h2>
        </Header>
        <NewCollectionComponent>
          <MessageComponent>
            Do you want to delete <b>{collectionName}</b>?
          </MessageComponent>

          <ButtonsComponent>
            <Button onClick={newCollectionHandle}>
              Yes, create <b>New Collection</b>
            </Button>
            <Button onClick={continueHandle}>No, Continue work</Button>
          </ButtonsComponent>
        </NewCollectionComponent>
      </>
    )
  }

  return (
    <>
      <Header>
        <h2>{labels.new_collection_title}</h2>
      </Header>
      <NewCollectionComponent>
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
      </NewCollectionComponent>
    </>
  )
}

export default NewCollection
