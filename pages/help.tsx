import React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import Page from '@/components/Page'
import Header from '@/components/Header'
import labels from '@/constants/labels'

const HelpPageComponent = styled.div<{ disabled?: boolean }>`
  padding: var(--gap);
  overflow: auto;
  flex: 1;
`

const HelpItem = css`
  margin-top: -1px;
  padding: 1rem;
  border: var(--border);
  border-radius: var(--radius);
`

const HelpHeader = styled.h3`
  ${HelpItem};
  cursor: pointer;
  display: flex;
  align-items: center;
  &:before {
    display: inline-block;
    content: '';
    height: 0.5rem;
    width: 0.5rem;
    margin-right: 12px;
    border-bottom: 2px solid var(--black);
    border-right: 2px solid var(--black);
    transform: rotate(-45deg);
  }
  &:hover {
    background-color: var(--white);
  }
`

const HelpContent = styled.div`
  ${HelpItem};
`

const ImageWrapper = styled.div`
  max-width: 600px;
`

const HelpAccordionButton = styled(AccordionItemButton)`
  &[aria-expanded='true'] {
    ${HelpHeader} {
      background-color: var(--white);
      &:before {
        transform: rotate(45deg);
      }
    }
  }
`

const items = [
  {
    id: 1,
    heading: 'Overview',
    content: (
      <>
        <p>GimmeImage is an application that helps you generate a collection of images from source *.png layers.</p>
        <ImageWrapper>
          <Image src="/about.png" width="1118px" height="603px" />
        </ImageWrapper>
      </>
    ),
  },
  {
    id: 2,
    heading: 'Getting Started',
    content: (
      <ol>
        <li>Click the &quot;{labels.new_collection_title}&quot; button in the left sidebar.</li>
      </ol>
    ),
  },
  {
    id: 3,
    heading: labels.add_option_title,
    content: (
      <ol>
        <li>Click the &quot;{labels.add_option_title}&quot; button in the left sidebar.</li>
      </ol>
    ),
  },
  {
    id: 4,
    heading: labels.import_folder_title,
    content: (
      <ol>
        <li>Click the &quot;{labels.import_folder_title}&quot; button in the left sidebar.</li>
      </ol>
    ),
  },
  {
    id: 5,
    heading: labels.export_collection_title,
    content: (
      <ol>
        <li>Click the &quot;{labels.export_collection_title}&quot; button in the left sidebar.</li>
      </ol>
    ),
  },
]

const HelpPage: NextPage = () => {
  return (
    <Page>
      <Header>
        <h2>{labels.help_title}</h2>
      </Header>
      <HelpPageComponent>
        <Accordion preExpanded={[1]}>
          {items.map((item) => (
            <AccordionItem uuid={item.id} key={item.id}>
              <AccordionItemHeading>
                <HelpAccordionButton>
                  <HelpHeader>{item.heading}</HelpHeader>
                </HelpAccordionButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <HelpContent>{item.content}</HelpContent>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </HelpPageComponent>
    </Page>
  )
}

export default HelpPage
