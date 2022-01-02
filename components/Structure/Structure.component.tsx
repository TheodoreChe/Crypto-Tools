import { FC } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { actionElement } from '@/constants/styles'
import { useAppSelector } from '@/state/hooks'
import { getProperties } from '@/state/collection'

const ContainerComponent = styled.div`
  height: 0;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  margin-top: -1px;
  border: var(--border);
  border-radius: var(--radius);
  padding: calc(var(--gap) / 2);
`

const ItemComponent = styled.div<{ index: number }>`
  ${({ index }) => index && `margin-top: -1px;`}
`

const PropertyComponent = styled.div`
  ${actionElement};
  background: var(--black);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const OptionComponent = styled.div`
  ${actionElement};
  margin-top: -1px;
  margin-left: var(--gap);
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const Structure: FC = () => {
  const properties = useAppSelector(getProperties)
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
            <PropertyComponent>
              {property.name} <FontAwesomeIcon icon={faTimes} color="white" />
            </PropertyComponent>
            {property.options?.map((option) => (
              <OptionComponent key={option.name}>
                {option.name}
                <FontAwesomeIcon icon={faTimes} />
              </OptionComponent>
            ))}
          </ItemComponent>
        ))}
      </ContainerComponent>
      <Button>Delete All</Button>
      <Number>The size of the collection: {count}</Number>
    </>
  )
}

export default Structure
