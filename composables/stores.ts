import { useAppSharedStore as useAppSharedStoreImport } from '@/src/modules/app/shared-store'
import { useAppHomeStore as useAppHomeStoreImport } from '@/src/modules/app/home/store'

export const useAppSharedStore = () => {
  return useAppSharedStoreImport()
}

export const useAppHomeStore = () => {
  return useAppHomeStoreImport()
}
