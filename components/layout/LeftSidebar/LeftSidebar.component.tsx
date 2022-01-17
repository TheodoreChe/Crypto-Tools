import { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import { directoryOpen } from 'browser-fs-access'
import Button from '@/components/form/Button'
import {
  addPreview,
  addPreviewMeta,
  getCollectionName,
  getIsPropertiesEmpty,
  getProperties,
  getRandomOptionList,
  importCollection,
} from '@/state/collection'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import LinkButton from '@/components/form/LinkButton'
import labels from '@/constants/labels'
import mergeOptions from '../../../lib/mergeOptions'
import Preview from './Preview.component'

const LeftMenuComponent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const LeftSidebar: FC = () => {
  const dispatch = useAppDispatch()
  const properties = useAppSelector(getProperties)
  const isPropertiesEmpty = useAppSelector(getIsPropertiesEmpty)
  const collectionName = useAppSelector(getCollectionName)

  const generateExampleHandle = useCallback(async () => {
    const optionList = getRandomOptionList(properties)

    // Create Meta
    const previewMeta = optionList.map(({ propertyName, name }) => `${propertyName}: ${name}`)

    mergeOptions(optionList).then((image) => dispatch(addPreview(image)))
    dispatch(addPreviewMeta(previewMeta))
  }, [properties])

  const importCollectionHandle = useCallback(async () => {
    try {
      const blobs = await directoryOpen({
        recursive: true,
      })
      if (blobs) {
        dispatch(importCollection(blobs))
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <LeftMenuComponent>
      <LinkButton href="/new_collection">{labels.new_collection_title}</LinkButton>
      <LinkButton href="/edit_collection" disabled={collectionName == null}>
        Edit {collectionName}
      </LinkButton>

      <Button disabled={collectionName == null} onClick={importCollectionHandle}>
        {labels.import_folder_title}
      </Button>
      <LinkButton disabled={isPropertiesEmpty} href="/export_collection">
        {labels.export_collection_title}
      </LinkButton>

      <LinkButton href="/help">{labels.help_title}</LinkButton>

      <Preview />

      <Button disabled={isPropertiesEmpty} onClick={generateExampleHandle}>
        Generate Example
      </Button>
    </LeftMenuComponent>
  )
}

export default LeftSidebar
