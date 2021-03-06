import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { device } from '@/constants/breakpoints'
import GridRow from './GridRow.component'
import GridColumn from './GridColumn.component'

interface GridProps {
  children: ReactNode
}

interface GridInterface extends FC<GridProps> {
  Row: typeof GridRow
  Column: typeof GridColumn
}

const GridComponent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-right: auto;
  margin-left: auto;
`

const Grid: GridInterface = ({ children }) => {
  return <GridComponent>{children}</GridComponent>
}

Grid.Row = GridRow
Grid.Column = GridColumn

export default Grid
