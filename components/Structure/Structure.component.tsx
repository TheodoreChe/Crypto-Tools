import { FC } from 'react'
import styled from 'styled-components'
import { Property } from '@/state/Properties.types'
import { actionElement } from '@/constants/styles'

type StructureProps = {
  properties?: Property[]
}

const ContainerComponent = styled.div`
  height: 0;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  margin-top: -1px;
  border: var(--border);
  border-radius: var(--radius);
  padding: 1rem var(--gap);
`

const ItemComponent = styled.div<{ index: number }>`
  ${({ index }) => index && `margin-top: -1px;`}
`

const PropertyComponent = styled.div`
  ${actionElement}
`

const OptionComponent = styled.div`
  ${actionElement};
  margin-top: -1px;
  margin-left: var(--gap);
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

const Number = styled.div`
  ${actionElement};
  margin-top: -1px;
`

const Structure: FC<StructureProps> = ({ properties }) => {
  const count =
    properties &&
    properties.length &&
    properties.reduce((acc, cur) => {
      const optionsNumber = cur.options?.length
      if (optionsNumber && optionsNumber > 0) {
        return acc * optionsNumber
      }
      return acc
    }, 1)

  return (
    <>
      <ContainerComponent>
        {properties?.map((property, index) => (
          <ItemComponent key={property.name} index={index}>
            <PropertyComponent>{property.name}</PropertyComponent>
            {property.options?.map((option) => (
              <OptionComponent key={option.name}>{option.name}</OptionComponent>
            ))}
          </ItemComponent>
        ))}
      </ContainerComponent>
      <Number>The size of the collection: {count}</Number>
      <Button>Delete All</Button>
    </>
  )
}

export default Structure
