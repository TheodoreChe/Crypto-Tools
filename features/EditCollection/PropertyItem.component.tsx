import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { addOption, createName, deletePropertyById, Property } from '@/state/collection'
import { useAppDispatch } from '@/state/hooks'
import OptionItem from './OptionItem.component'
import Actions from './Actions.component'
import BoardInput from './BoardInput.component'
import { nameValidations, rarityValidations } from './editCollection.constants'

type PropertyItemProps = {
  index: number
  property: Property
}

const PropertyItemWrapper = styled.div`
  margin-left: -1px;
`

const PropertyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  border: var(--border);
  border-radius: var(--radius);
  width: 18rem;
  padding: 1rem;
  font-weight: bold;
`

const AddOptionComponent = styled.div`
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  border-radius: var(--radius);
  &:hover {
    background-color: #eee;
  }
`

const PropertyInputs = styled.div`
  flex: 1;
`
const PropertyNameInput = styled(BoardInput)`
  font-weight: bold;
`

const PropertyRarityInput = styled(BoardInput)`
  color: #999;
  &:hover,
  &:active,
  &:focus {
    color: var(--black);
  }
`

/**
 * Property Item - A single property item in the property board
 */
function PropertyItem({ index, property: { id, name, options } }: PropertyItemProps): JSX.Element | null {
  const dispatch = useAppDispatch()

  if (!id) {
    return null
  }

  function deletePropertyHandle() {
    if (!id) return
    dispatch(deletePropertyById({ id }))
  }

  function addOptionHandle() {
    dispatch(addOption({ propertyName: name, optionName: createName(options || []) }))
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <PropertyItemWrapper ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <PropertyHeader>
            <PropertyInputs>
              <PropertyNameInput name={`properties.[${index}].name`} validations={nameValidations} />
              <PropertyRarityInput name={`properties.[${index}].rarity`} validations={rarityValidations} />
            </PropertyInputs>
            <Actions
              onDelete={deletePropertyHandle}
              onAdd={addOptionHandle}
              tooltipForDelete={`Delete ${name}`}
              tooltipForAdd="Add option"
            />
          </PropertyHeader>

          {options?.map((option, optionIndex) => (
            <OptionItem key={option.id} option={option} fieldName={`properties.[${index}].options[${optionIndex}]`} />
          ))}

          <AddOptionComponent onClick={addOptionHandle}>+ Add Option</AddOptionComponent>
        </PropertyItemWrapper>
      )}
    </Draggable>
  )
}

export default PropertyItem
