import React from 'react'
import { NextPage } from 'next'
import Page from '@/components/Page'
import ExportCollection from '@/features/ExportCollection'

const ExportCollectionPage: NextPage = () => {
  return (
    <Page>
      <ExportCollection />
    </Page>
  )
}

export default ExportCollectionPage
