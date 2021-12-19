import { FC } from 'react'
import styled from 'styled-components'
import mergeImages from 'merge-images'
import { Property } from '@/state/Properties.types'
import { actionElement } from '@/constants/styles'

type PreviewProps = {
  properties?: Property[]
}

const PreviewComponent = styled.div`
  height: 0;
  flex-grow: 1;
  flex-shrink: 1;
  margin-top: -1px;
  border: var(--border);
  border-radius: var(--radius);
`

const Button = styled.button`
  ${actionElement};
  margin-top: -1px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`

const Preview: FC<PreviewProps> = ({ properties }) => {
  const picturesList = (properties?.map((property) => property.options?.[0]?.picture?.[0]) ?? []).filter(Boolean)

  console.log('picturesList', picturesList)
  if (picturesList) {
    mergeImages(picturesList.map(URL.createObjectURL)).then((b64) => console.log('b64', b64))
  }

  return (
    <>
      <Button>Login</Button>
      <Button>Export</Button>

      <PreviewComponent>1</PreviewComponent>
      <Button>Generate</Button>
    </>
  )
}

export default Preview
