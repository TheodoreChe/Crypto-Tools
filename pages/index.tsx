import React from 'react'
import { NextPage } from 'next'
import Page from '@/components/Page'
import NewCollection from '@/features/NewCollection'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/state/hooks'
import { getCollectionName } from '@/state/collection'

const HomePage: NextPage = () => {
  const router = useRouter()
  console.log('router.pathname', router.pathname)
  // const collectionName = useAppSelector(getCollectionName)

  return (
    <Page>
      <NewCollection />
    </Page>
  )
}

export default HomePage
