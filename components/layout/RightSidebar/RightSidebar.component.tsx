import { FC } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { deleteProperties, getAmountOfOptions, getCollectionName, getIsPropertiesEmpty } from '@/state/collection'
import Header from '@/components/Header'
import Button from '@/components/form/Button/Button.component'
import { actionElement } from '@/constants/styles'
import PropertyList from './PropertyList.component'

const ButtonsWrapper = styled.div`
  display: flex;
  ${Button} {
    flex: 1;
  }
  ${Button}:not(:first-child) {
    margin-left: -1px;
  }
`

const CollectionInfo = styled.div`
  ${actionElement};
  margin-top: -1px;
`

const RightSidebar: FC = () => {
  const dispatch = useAppDispatch()
  const collectionName = useAppSelector(getCollectionName)
  const isPropertiesEmpty = useAppSelector(getIsPropertiesEmpty)
  const amountOfOptions = useAppSelector(getAmountOfOptions)

  const deleteAllHandle = () => {
    dispatch(deleteProperties())
  }

  return (
    <>
      <Header border>
        <h2>{collectionName} Layers</h2>
      </Header>
      <ButtonsWrapper>
        <Button disabled>Undo</Button>
        <Button disabled={isPropertiesEmpty} onClick={deleteAllHandle}>
          Delete All
        </Button>
      </ButtonsWrapper>
      <PropertyList />
      <CollectionInfo>It is possible to generate {amountOfOptions} images</CollectionInfo>
    </>
  )
}

export default RightSidebar
