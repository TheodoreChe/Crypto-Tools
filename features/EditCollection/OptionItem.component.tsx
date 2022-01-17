import styled from 'styled-components'
import { deleteOptionById, Option, setModalId } from '@/state/collection'
import { useAppDispatch } from '@/state/hooks'
import Actions from './Actions.component'
import localForage from 'localforage'
import React, { useEffect, useState } from 'react'
import BoardInput from '@/features/EditCollection/BoardInput.component'
import { nameValidations, rarityValidations } from '@/features/EditCollection/editCollection.constants'
import EditOptionModal from '@/features/EditCollection/EditOptionModal.component'

type OptionItemProps = {
  fieldName: string
  option: Option
}

const OptionItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-top: -1px;
  border: var(--border);
  border-radius: var(--radius);
  background-color: var(--lightgray);
`

const OptionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OptionInputs = styled.div``
const OptionImage = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: var(--black);
  border-radius: var(--radius);
  margin-right: 1rem;
  overflow: hidden;
  img {
    max-width: 100%;
  }
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
 * OptionItem - A single option item
 */
function OptionItem({ option: { id, name, fileName }, fieldName }: OptionItemProps): JSX.Element {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!imageSrc) {
      getImageSrc()
    }
  }, [fileName])

  async function getImageSrc() {
    const blob = fileName && (await localForage.getItem<Blob>(fileName))
    blob && setImageSrc(URL.createObjectURL(blob))
  }

  function deleteOptionHandle() {
    if (!id) return
    dispatch(deleteOptionById({ id }))
  }

  function editOptionHandle() {
    if (!id) return
    dispatch(setModalId(id))
  }

  return (
    <>
      <OptionItemWrapper>
        <OptionInfo>
          <OptionImage data-tip={!imageSrc && 'Please add image'}>
            {imageSrc && <img src={imageSrc} alt={`${name} preview`} />}
          </OptionImage>
          <div>
            <BoardInput name={`${fieldName}.name`} validations={nameValidations} />
            <PropertyRarityInput name={`${fieldName}.rarity`} validations={rarityValidations} />
          </div>
        </OptionInfo>

        <Actions
          onEdit={editOptionHandle}
          onDelete={deleteOptionHandle}
          tooltipForDelete={`Delete ${name}`}
          tooltipForEdit={`Edit ${name}`}
        />
      </OptionItemWrapper>
    </>
  )
}

export default OptionItem
