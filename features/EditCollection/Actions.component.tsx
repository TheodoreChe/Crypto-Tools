import styled from 'styled-components'

import { ListIcon, TrashIcon, PlusIcon } from '@/components/icons'

type ActionsProps = {
  onEdit?: () => void
  onDelete?: () => void
  onAdd?: () => void
  tooltipForAdd?: string
  tooltipForEdit?: string
  tooltipForDelete?: string
}

const IconComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  svg {
    width: 1rem;
    height: 1rem;
  }
`

/**
 * Renders the actions for the property board
 */
function Actions({
  onEdit,
  onDelete,
  onAdd,
  tooltipForAdd,
  tooltipForEdit,
  tooltipForDelete,
}: ActionsProps): JSX.Element {
  return (
    <div>
      {onDelete && (
        <IconComponent onClick={onDelete} data-tip={tooltipForDelete}>
          <TrashIcon />
        </IconComponent>
      )}
      {onEdit && (
        <IconComponent onClick={onEdit} data-tip={tooltipForEdit}>
          <ListIcon />
        </IconComponent>
      )}
      {onAdd && (
        <IconComponent onClick={onAdd} data-tip={tooltipForAdd}>
          <PlusIcon />
        </IconComponent>
      )}
    </div>
  )
}

export default Actions
