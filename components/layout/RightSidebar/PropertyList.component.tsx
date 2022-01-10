import { FC } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { getProperties, reorderProperties } from '@/state/collection'
import PropertyItem from './PropertyItem.component'

const PropertyListComponent = styled.div`
  height: 0;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  margin-top: -1px;
  border: var(--border);
  border-radius: var(--radius);
  padding: calc(var(--gap) / 2);
`

const PropertyList: FC = () => {
  const dispatch = useAppDispatch()
  const properties = useAppSelector(getProperties)

  function onDragEnd(result: any) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    dispatch(reorderProperties({ startIndex: result.source.index, endIndex: result.destination.index }))
  }

  return (
    <PropertyListComponent>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="PropertyList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {properties.map((property, index) => (
                <PropertyItem key={`PropertyItem-${property.name}`} index={index} property={property} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </PropertyListComponent>
  )
}

export default PropertyList
