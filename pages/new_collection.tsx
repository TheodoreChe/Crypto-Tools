import React from 'react'
import { NextPage } from 'next'
import Page from '@/components/Page'
import NewCollection from '@/features/NewCollection'

const NewCollectionPage: NextPage = () => {
  return (
    <Page>
      <NewCollection />
    </Page>
  )
}

export default NewCollectionPage
