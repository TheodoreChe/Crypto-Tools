import { HTMLProps } from 'react'
import styled, { css, StyledFunction, ThemedStyledFunction } from 'styled-components'
import { device } from '@/constants/breakpoints'

interface GridColumnProps {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

const getWidthByMedia = ({ xl, lg, md, sm }: GridColumnProps) =>
  [
    [sm, device.sm],
    [md, device.md],
    [lg, device.lg],
    [xl, device.xl],
  ]
    .filter(([size]) => Boolean(size))
    .map(
      ([size, media]) => css`
        @media ${media} {
          max-width: ${(100 / 12) * Number(size)}%;
        }
      `,
    )

const GridColumn = styled.div<GridColumnProps>`
  flex-grow: 1;
  flex-shrink: 0;
  width: ${({ xs }) => (100 / 12) * Number(xs ?? 12)}%;
  ${getWidthByMedia};
`

export default GridColumn
