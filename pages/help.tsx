import React from 'react'
import { NextPage } from 'next'
import Page from '@/components/Page'
import Header from '@/components/Header'
import labels from '@/constants/labels'
import styled from 'styled-components'

const HelpPageComponent = styled.div<{ disabled?: boolean }>`
  padding: var(--gap);
`

const HelpPage: NextPage = () => {
  return (
    <Page>
      <Header>
        <h2>{labels.help_title}</h2>
      </Header>
      <HelpPageComponent>
        <h3>Create new collection</h3>
        <ol>
          <li>Click</li>
          <li></li>
          <li></li>
        </ol>
        <h3>Create and manage options</h3>
        <ol>
          <li>Click</li>
          <li></li>
          <li></li>
        </ol>
        <h3>Export Collection</h3>
        <ol>
          <li>Click</li>
          <li></li>
          <li></li>
        </ol>
        <h3>Generate Example</h3>
        <ol>
          <li>Click</li>
          <li></li>
        </ol>
      </HelpPageComponent>
    </Page>
  )
}

export default HelpPage
