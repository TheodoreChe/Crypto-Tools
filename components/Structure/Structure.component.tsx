import { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faEdit } from '@fortawesome/free-regular-svg-icons'
import { actionElement } from '@/constants/styles'
import Button from '@/components/form/Button'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import {
  deleteOptionByName,
  deleteProperties,
  deletePropertyByName,
  getCollectionName,
  getProperties,
} from '@/state/collection'
import Header from '@/components/Header'

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

const Number = styled.div`
  ${actionElement};
  margin-top: -1px;
`

const IconComponent = styled.div`
  cursor: pointer;
  height: 1.7rem;
  width: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`

const IconsComponent = styled.div`
  display: flex;
`

const ButtonsComponent = styled.div`
  display: flex;
  ${Button} {
    flex: 1;
  }
  ${Button}:not(:first-child) {
    margin-left: -1px;
  }
`

const Structure: FC = () => {
  const dispatch = useAppDispatch()
  const collectionName = useAppSelector(getCollectionName)
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

  const deleteAllHandle = () => {
    dispatch(deleteProperties())
  }

  const deletePropertyHandle = (payload: { propertyName: string }) => () => {
    dispatch(deletePropertyByName(payload))
  }

  const deleteOptionHandle = (payload: { propertyName: string; optionName: string }) => () => {
    dispatch(deleteOptionByName(payload))
  }

  return (
    <>
      <Header border>
        <h2>{collectionName ?? 'Collection Name'}</h2>
      </Header>
      <ButtonsComponent>
        <Button disabled>Undo</Button>
        <Button disabled>Redo</Button>
        <Button disabled={properties?.length === 0} onClick={deleteAllHandle}>
          Delete
        </Button>
      </ButtonsComponent>
      <ContainerComponent>
        {properties?.map((property, index) => (
          <ItemComponent key={property.name} index={index}>
            <PropertyComponent>
              {property.name}{' '}
              <IconComponent onClick={deletePropertyHandle({ propertyName: property.name })}>
                <FontAwesomeIcon icon={faTimesCircle} color="white" />
              </IconComponent>
            </PropertyComponent>
            {property.options?.map((option) => (
              <OptionComponent key={option.name}>
                {option.name}
                <IconsComponent>
                  <Link href={{ pathname: '/edit_option', query: { id: option.id } }}>
                    <a>
                      <IconComponent>
                        <FontAwesomeIcon icon={faEdit} />
                      </IconComponent>
                    </a>
                  </Link>

                  <IconComponent onClick={deleteOptionHandle({ propertyName: property.name, optionName: option.name })}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </IconComponent>
                </IconsComponent>
              </OptionComponent>
            ))}
          </ItemComponent>
        ))}
      </ContainerComponent>
      <Number>The size of the collection: {count}</Number>
    </>
  )
}

export default Structure
