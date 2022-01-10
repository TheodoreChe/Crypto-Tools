import { FC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { deleteOptionById, deletePropertyById, Property } from '@/state/collection'
import { actionElement } from '@/constants/styles'
import { useAppDispatch } from '@/state/hooks'

type PropertyItemComponentProps = {
  index: number
}

type PropertyItemProps = PropertyItemComponentProps & {
  property: Property
}

const PropertyItemComponent = styled.div<PropertyItemComponentProps>`
  ${({ index }) => index && `margin-top: -1px;`}
`

const Property = styled.div`
  ${actionElement};
  background: var(--black);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Option = styled.div`
  ${actionElement};
  margin-top: -1px;
  margin-left: var(--gap);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Icon = styled.div`
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

const IconsWrapper = styled.div`
  display: flex;
`

const PropertyItem: FC<PropertyItemProps> = ({ index, property }) => {
  const dispatch = useAppDispatch()

  const deletePropertyHandle = (id?: string) => () => {
    if (!id) return
    dispatch(deletePropertyById({ id }))
  }

  const deleteOptionHandle = (id?: string) => () => {
    if (!id) return
    dispatch(deleteOptionById({ id }))
  }

  return (
    <Draggable draggableId={String(property.id)} index={index}>
      {(provided) => (
        <PropertyItemComponent
          index={index}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Property>
            {property.name}
            <IconsWrapper>
              <Icon>
                <FontAwesomeIcon icon={faEdit} />
              </Icon>
              <Icon onClick={deletePropertyHandle(property.id)}>
                <FontAwesomeIcon icon={faTimesCircle} color="white" />
              </Icon>
            </IconsWrapper>
          </Property>

          {property.options?.map((option) => (
            <Option key={`OptionItem-${option.id}`}>
              {option.name}
              <IconsWrapper>
                <Link href={{ pathname: '/edit_option', query: { id: option.id } }}>
                  <a>
                    <Icon>
                      <FontAwesomeIcon icon={faEdit} />
                    </Icon>
                  </a>
                </Link>

                <Icon onClick={deleteOptionHandle(option.id)}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </Icon>
              </IconsWrapper>
            </Option>
          ))}
        </PropertyItemComponent>
      )}
    </Draggable>
  )
}

export default PropertyItem
