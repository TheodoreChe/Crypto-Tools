import { SVGProps } from 'react'

export function ListIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 30 30" fill="#000" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM4 23a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM2 15a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM28 14H10v2h18v-2ZM10 4h18v2H10V4ZM28 24H10v2h18v-2Z" />
    </svg>
  )
}
