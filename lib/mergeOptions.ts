import localForage from 'localforage'
import mergeImages from 'merge-images'
import { Option } from '@/state/collection'

export default async function mergeOptions(optionList: Option[]) {
  const getBlobList = optionList.map(({ fileName }) => fileName && localForage.getItem<Blob>(fileName))
  const blobList = await Promise.all(getBlobList)
  const safeBlobList = blobList.filter(Boolean) as Blob[]

  const urlList = safeBlobList.map(URL.createObjectURL)
  return mergeImages(urlList)
}
