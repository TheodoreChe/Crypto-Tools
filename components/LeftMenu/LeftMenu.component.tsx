import { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import mergeImages from 'merge-images'
import localForage from 'localforage'
import Button from '@/components/form/Button'
import {
  addPreview,
  getCollectionName,
  getCollectionPreview,
  getIsPropertiesEmpty,
  getProperties,
  getRandomFileNameList,
} from '@/state/collection'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import LinkButton from '@/components/form/LinkButton'
import labels from '@/constants/labels'

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

  const generateExampleHandle = useCallback(async () => {
    const fileNameList = getRandomFileNameList(properties)

    const blobList = (await Promise.all(fileNameList.map((fileName) => localForage.getItem<Blob>(fileName)))) as Blob[]
    const urlList = blobList.map(URL.createObjectURL)
    mergeImages(urlList).then((image) => dispatch(addPreview(image)))
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

      <Button disabled={isPropertiesEmpty} onClick={generateExampleHandle}>
        Generate Example
      </Button>
    </LeftMenuComponent>
  )
}

export default LeftMenu
