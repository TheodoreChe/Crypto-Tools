import React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Page from '@/components/Page'
import Header from '@/components/Header'
import labels from '@/constants/labels'
import styled from 'styled-components'

const HelpPageComponent = styled.div<{ disabled?: boolean }>`
  padding: var(--gap);
  overflow: auto;
  flex: 1;
`

const HelpItem = styled.div`
  margin-bottom: var(--gap);
`

const HelpPage: NextPage = () => {
  return (
    <Page>
      <Header>
        <h2>{labels.help_title}</h2>
      </Header>
      <HelpPageComponent>
        <HelpItem>
          <h3>Purpose</h3>
          <p>GimmeImage is an application that helps you generate a collection of images from source *.png layers.</p>
          <Image src="/about.png" width="1118px" height="603px" />
        </HelpItem>

        <HelpItem>
          <h3>Getting Started</h3>
          <ol>
            <li>Click the New Collection button in the left sidebar.</li>
          </ol>
        </HelpItem>

        <HelpItem>
          <h3>Add Option</h3>
          <ol>
            <li>Click the Add Option button in the left sidebar.</li>
          </ol>
        </HelpItem>

        <HelpItem>
          <h3>Import Folder</h3>
          <ol>
            <li>Click the Import Folder button in the left sidebar.</li>
          </ol>
        </HelpItem>

        <HelpItem>
          <h3>Export Collection</h3>
          <ol>
            <li>Click the Export Collection button in the left sidebar.</li>
          </ol>
        </HelpItem>
      </HelpPageComponent>
    </Page>
  )
}

export default HelpPage
