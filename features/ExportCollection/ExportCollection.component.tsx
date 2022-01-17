import React, { FC, useState } from 'react'
import styled from 'styled-components'
import mergeImages from 'merge-images'
import localForage from 'localforage'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import Header from '@/components/Header'
import {
  getCollectionName,
  getProperties,
  getPropertiesCartesianProduct,
  Option,
  sliceArrayByChunks,
} from '@/state/collection'
import { useAppSelector } from '@/state/hooks'
import { actionElement } from '@/constants/styles'
import mergeOptions from '../../lib/mergeOptions'

const ExportCollectionComponent = styled.div<{ disabled?: boolean }>`
  height: 0;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  padding: var(--gap);
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`

const Item = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: var(--gap);
`

const ItemNumber = styled.div`
  background-color: var(--black);
  color: var(--white);
  border: var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  display: flex;
  align-items: center;
  min-width: 6rem;
  justify-content: center;
  margin-right: 1rem;
`

const ItemDescription = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  flex: 1;
`

const ItemButton = styled.button`
  ${actionElement};
  background: transparent;
  cursor: pointer;
  padding: 1rem 3.75rem;
  &:hover {
    background-color: var(--white);
  }
`

const ExportCollection: FC = () => {
  const properties = useAppSelector(getProperties)
  const propertiesCartesianProduct = useAppSelector(getPropertiesCartesianProduct)
  const collectionName = useAppSelector(getCollectionName) || 'collection'
  const slicedPropertiesProduct = sliceArrayByChunks(propertiesCartesianProduct)
  const [inProgress, setInProgress] = useState(false)
  const exportHandle = (product: any) => async () => {
    setInProgress(true)

    const zip = new JSZip()
    const folder = zip.folder(collectionName)

    const blobList = await Promise.all(
      product.map(async (options: Option[]) => {
        const base64 = await mergeOptions(options)
        return await fetch(base64).then((res) => res.blob())
      }),
    )

    blobList.map((blob, index) => {
      folder && folder.file(`${collectionName}__${index}.png`, blob)
    })

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, `${collectionName}.zip`)
    })

    setInProgress(false)
  }

  return (
    <>
      <Header>
        <h2>Export Collection</h2>
      </Header>
      <ExportCollectionComponent disabled={inProgress}>
        {slicedPropertiesProduct.map((product: any, index: number) => (
          <Item key={index}>
            <ItemNumber>Part {index + 1}</ItemNumber>
            <ItemButton onClick={exportHandle(product)}>Export</ItemButton>
            <ItemDescription>{product.length} items</ItemDescription>
          </Item>
        ))}
      </ExportCollectionComponent>
    </>
  )
}

export default ExportCollection
