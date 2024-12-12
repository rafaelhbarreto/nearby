import { useEffect, useState } from 'react'
import {View, Alert} from 'react-native'
import { Categories, CategoriesProps } from '@/components/Categories'
import { api } from '@/config/axios'
import { PlaceProps } from '@/components/Place'
import { Places } from '@/components/Places'

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState<string | null>(null)
  const [places, setPlaces] = useState<PlaceProps[]>([])

  /**
   * Fetch categories from API
   */
  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories")
      setCategories(data)
      setCategory(data[0].id)
    } catch (err) {
      console.log(err)
      Alert.alert("Erro ao buscar categorias")  
    } 
  }

  /**
   * Fetch places from API
   */
  async function fetchPlaces() {
    try {
      if (!category) return

      const { data } = await api.get(`/markets/category/` + category)
      setPlaces(data)

    } catch (err) {
      console.log(err)
      Alert.alert("Erro ao buscar lugares")
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])
  
  
  useEffect(() => {
    fetchPlaces()
  }, [category])

  return (
    <View style={{ flex: 1}}>
      <Categories 
        onSelected={setCategory}
        selected={category}
        data={categories}
      />
      <Places data={places}/>
    </View>
  )
}