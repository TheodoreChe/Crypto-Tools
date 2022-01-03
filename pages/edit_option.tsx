import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Page from '@/components/Page'
import AddOption from '@/features/AddOption'

const AddOptionPage: NextPage = () => {
  const router = useRouter()
  return (
    <Page>
      <AddOption id={String(router.query.id)} />
    </Page>
  )
}

export default AddOptionPage
