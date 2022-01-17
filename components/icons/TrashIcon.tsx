import { SVGProps } from 'react'

export function TrashIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox="0 0 30 30" fill="#000" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 23V11h2v12h-2ZM16 11v12h2V11h-2Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 5a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4h7v2h-4v22H6V7H2V5h7ZM8 7v20h14V7H8Zm9-4a2 2 0 0 1 2 2h-8a2 2 0 0 1 2-2h4Z"
      />
    </svg>
  )
}
