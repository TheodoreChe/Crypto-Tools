import { css } from 'styled-components'

export const actionElement = css`
  padding: 1rem;
  border: var(--border);
  border-radius: var(--radius);
  font-size: 1rem;
  line-height: 1.75rem;
`

export const buttonElement = css`
  ${actionElement};
  margin-top: -1px;
  background-color: transparent;
  text-align: center;
  user-select: none;
  font-size: 1rem;
  font-family: var(--fonts);
`
