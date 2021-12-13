import { FC } from 'react'
import styled from 'styled-components'
import { Property } from '@/state/Properties.types'
import { actionElement } from '@/constants/styles'

type StructureProps = {
  properties?: Property[]
}

const ContainerComponent = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  border-bottom: var(--border);
  border-left: var(--border);
  border-right: var(--border);
  padding: 1rem var(--gap);
  border-radius: var(--radius);
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

const Structure: FC<StructureProps> = ({ properties }) => {
  return (
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
  )
}

export default Structure
