import React from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { getProperties, reorderProperties } from '@/state/collection'
import DoubleScrollbar from '@/components/DoubleScrollbar'
import PropertyItem from './PropertyItem.component'

const PropertyBoardWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const PropertyBoardScroll = styled(DoubleScrollbar)`
  display: flex;
  padding: 1rem var(--gap);
  width: 100%;
  height: 100%;
  overflow: auto;
`

/**
 * PropertyBoard - A board to display and edit properties
 */
function PropertyBoard(): JSX.Element {
  const dispatch = useAppDispatch()
  const properties = useAppSelector(getProperties)

  /**
   * Handle drag and drop reordering of properties
   * @param result - The result of the drag and drop operation
   */
  function onDragEnd(result: any) {
    if (!result.destination || result.destination.index === result.source.index) {
      return
    }
    dispatch(reorderProperties({ startIndex: result.source.index, endIndex: result.destination.index }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="PropertyBoard" type="COLUMN" direction="horizontal">
        {(provided) => (
          <PropertyBoardWrapper ref={provided.innerRef} {...provided.droppableProps}>
            <PropertyBoardScroll>
              {properties.map((property, index) => (
                <PropertyItem key={`PropertyItem-${property.id}`} property={property} index={index} />
              ))}
              {provided.placeholder}
            </PropertyBoardScroll>
          </PropertyBoardWrapper>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default PropertyBoard
