import { FC } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '@/state/hooks'
import { getCollectionPreview, getCollectionPreviewMeta } from '@/state/collection'

const maxHeight = '920px'
const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  padding: calc(var(--gap) / 2);
  margin-top: -1px;
  border: var(--border);
  border-radius: var(--radius);

  @media screen and (min-height: ${maxHeight}) {
    flex-direction: column;
  }
`

const ImageContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  align-items: center;
  justify-content: center;
  @media screen and (min-height: ${maxHeight}) {
    margin-bottom: calc(var(--gap) / 2);
  }
`

const ImageComponent = styled.img`
  max-width: 100%;
`

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;

  @media screen and (min-height: ${maxHeight}) {
    padding-left: 0;
    max-height: 10rem;
    overflow: auto;
  }
`

const InformationComponent = styled.div`
  font-size: 0.75rem;
  line-height: 1.2rem;
`

const Preview: FC = () => {
  const imageSrc = useAppSelector(getCollectionPreview)
  const informationList = useAppSelector(getCollectionPreviewMeta)

  if (imageSrc && informationList) {
    return (
      <Wrapper>
        <ImageContainer>
          <ImageComponent src={imageSrc} alt="Preview" />
        </ImageContainer>

        <InformationContainer>
          {informationList.map((meta) => (
            <InformationComponent key={meta}>{meta}</InformationComponent>
          ))}
        </InformationContainer>
      </Wrapper>
    )
  }

  return null
}

export default Preview
