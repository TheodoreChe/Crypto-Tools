import React from 'react'
import { NextPage } from 'next'
import Page from '@/components/Page'
import EditCollection from '@/features/EditCollection'

const EditPage: NextPage = () => {
  return (
    <Page>
      <EditCollection />
    </Page>
  )
}

export default EditPage
