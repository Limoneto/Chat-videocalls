import { useState } from 'react'
import { subscribeToCategories as subscribeCategoriesAPI } from '../firebaseAdminClient'

export const useAdminCategories = () => {
  const [categories, setCategories] = useState(null)

  const subscribeToCategories = () => {
    return subscribeCategoriesAPI(newCategories => {
      setCategories(newCategories)
    })
  }

  return {
    categories,
    subscribeToCategories,
  }
}
