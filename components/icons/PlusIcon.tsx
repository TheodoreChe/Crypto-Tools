import { SVGProps } from 'react'

export function PlusIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 30 30" fill="#000" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 14V3h-2v11H3v2h11v11h2V16h11v-2H16Z" />
    </svg>
  )
}
