import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import {
  addUntitledProperty,
  getAmountOfCombinations,
  getAmountOfOptions,
  getAmountOfProperties,
  getCollectionName,
  getProperties,
  Property,
  setProperties,
} from '@/state/collection'
import Header from '@/components/Header'
import PropertyBoard from './PropertyBoard.component'
import EditOptionModal from '@/features/EditCollection/EditOptionModal.component'

const CollectionInfo = styled.div`
  color: #999;
  span {
    margin-right: 1rem;
  }
`

const CollectionConfig = styled.div`
  margin: 0 var(--gap);
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
`

const AddProperty = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  color: var(--white);
  background-color: var(--black);
  border-radius: var(--radius);
  &:hover {
    background-color: #333;
  }
`

const StyledForm = styled.form`
  flex: 1;
  height: 0;
`

/**
 * EditCollection - renders the edit collection page
 */
function EditCollection(): JSX.Element {
  const methods = useForm({
    mode: 'onBlur',
  })
  const dispatch = useAppDispatch()
  const properties = useAppSelector(getProperties)
  const collectionName = useAppSelector(getCollectionName)
  const amountOfProperties = useAppSelector(getAmountOfProperties)
  const amountOfOptions = useAppSelector(getAmountOfOptions)
  const amountOfCombinations = useAppSelector(getAmountOfCombinations)

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [properties])

  useEffect(() => {
    methods.reset({ properties })
  }, [methods.reset, properties])

  const handleBlur = ({ properties }: { properties: Property[] }) => {
    dispatch(setProperties(properties))
  }

  const addPropertyHandle = () => {
    dispatch(addUntitledProperty())
  }

  return (
    <>
      <Header>
        <h2>{collectionName}</h2>
      </Header>
      <CollectionConfig>
        <AddProperty onClick={addPropertyHandle}>+ Add Property</AddProperty>
        <CollectionInfo>
          <span>{amountOfProperties} Properties</span>
          <span>{amountOfOptions} Options</span>
          <span>{amountOfCombinations} Combinations</span>
        </CollectionInfo>
      </CollectionConfig>

      <FormProvider {...methods}>
        <StyledForm onBlur={methods.handleSubmit(handleBlur)} autoComplete="off">
          <PropertyBoard />
        </StyledForm>
      </FormProvider>

      <EditOptionModal />
    </>
  )
}

export default EditCollection
