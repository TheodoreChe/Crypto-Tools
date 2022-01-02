import localForage from 'localforage'
import mergeImages from 'merge-images'
import { Option } from '@/state/collection'

export default async function mergeOptions(optionList: Option[]) {
  const getBlobList = optionList.map(({ fileName }) => fileName && localForage.getItem<Blob>(fileName))
  const blobList = (await Promise.all(getBlobList)) as Blob[]
  const urlList = blobList.map(URL.createObjectURL)
  return mergeImages(urlList)
}
