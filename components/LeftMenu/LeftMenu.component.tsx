import { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import mergeImages from 'merge-images'
import localForage from 'localforage'
import Button from '@/components/form/Button'
import {
  addPreview,
  addPreviewMeta,
  getCollectionName,
  getCollectionPreview,
  getCollectionPreviewMeta,
  getIsPropertiesEmpty,
  getProperties,
  getRandomOptionList,
} from '@/state/collection'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import LinkButton from '@/components/form/LinkButton'
import labels from '@/constants/labels'
import mergeOptions from '../../lib/mergeOptions'

const LeftMenuComponent = styled.div<{ progress: boolean }>`
  opacity: ${({ progress }) => (progress ? '0' : '1')};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const PreviewComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0;
  flex-grow: 1;
  flex-shrink: 1;
  margin-top: -1px;
  border: var(--border);
  border-radius: var(--radius);
`

const MetaComponent = styled.div`
  margin-top: -1px;
  padding: 1rem;
  border: var(--border);
  border-radius: var(--radius);
  font-size: 0.75rem;
  line-height: 1.2rem;
`

const ImgComponent = styled.img`
  max-width: calc(100% - var(--gap));
`

const LeftMenu: FC = () => {
  const [progress, setProgress] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const properties = useAppSelector(getProperties)
  const isPropertiesEmpty = useAppSelector(getIsPropertiesEmpty)
  const collectionName = useAppSelector(getCollectionName)
  const collectionPreview = useAppSelector(getCollectionPreview)
  const collectionPreviewMeta = useAppSelector(getCollectionPreviewMeta)

  const generateExampleHandle = useCallback(async () => {
    const optionList = getRandomOptionList(properties)

    // Create Meta
    const previewMeta = optionList.map(({ propertyName, name }) => `${propertyName}: ${name}`)

    mergeOptions(optionList).then((image) => dispatch(addPreview(image)))
    dispatch(addPreviewMeta(previewMeta))
  }, [properties])

  return (
    <LeftMenuComponent progress={progress}>
      <LinkButton href="/new_collection">{labels.new_collection_title}</LinkButton>
      <LinkButton disabled={collectionName == null} href="/add_option">
        {labels.add_option_title}
      </LinkButton>
      <LinkButton disabled={isPropertiesEmpty} href="/export_collection">
        {labels.export_collection_title}
      </LinkButton>
      <LinkButton href="/help">{labels.help_title}</LinkButton>

      <PreviewComponent>{collectionPreview && <ImgComponent src={collectionPreview} alt="Preview" />}</PreviewComponent>
      {collectionPreviewMeta && (
        <MetaComponent>
          {collectionPreviewMeta.map((meta) => (
            <div key={meta}>{meta}</div>
          ))}
        </MetaComponent>
      )}

      <Button disabled={isPropertiesEmpty} onClick={generateExampleHandle}>
        Generate Example
      </Button>
    </LeftMenuComponent>
  )
}

export default LeftMenu
