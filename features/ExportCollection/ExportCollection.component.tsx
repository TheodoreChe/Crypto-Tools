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
  const exportHandle = (product: any, productIndex: number) => async () => {
    setInProgress(true)

    const zip = new JSZip()
    const folderName = `${collectionName}__${productIndex}`
    const folder = zip.folder(folderName)

    const collection: { blob: Blob; attributes: Record<string, any> }[] = await Promise.all(
      product.map(async (options: Option[]) => {
        const base64 = await mergeOptions(options)
        const attributes = options.reduce((acc, option) => {
          const { propertyName, name } = option
          if (propertyName) {
            return { ...acc, [propertyName]: name }
          }
          return acc
        }, {})
        return await fetch(base64).then((res) => ({ blob: res.blob(), attributes }))
      }),
    )

    collection.map(({ blob, attributes }, index) => {
      if (folder) {
        const name = `${folderName}__${index}`
        folder.file(`${name}.png`, blob)
        folder.file(`${name}.json`, JSON.stringify(attributes))
      }
    })

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, `${folderName}.zip`)
    })

    setInProgress(false)
  }

  return (
    <>
      <Header>
        <h2>Export Collection</h2>
      </Header>
      <ExportCollectionComponent disabled={inProgress}>
        {slicedPropertiesProduct.map((product: any, productIndex: number) => (
          <Item key={productIndex}>
            <ItemNumber>Part {productIndex + 1}</ItemNumber>
            <ItemButton onClick={exportHandle(product, productIndex)}>Export</ItemButton>
            <ItemDescription>{product.length} items</ItemDescription>
          </Item>
        ))}
      </ExportCollectionComponent>
    </>
  )
}

export default ExportCollection
