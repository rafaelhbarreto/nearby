import { useEffect, useState } from 'react'
import {View, Text, Alert} from 'react-native'
import { Categories, CategoriesProps } from '@/components/Categories'
import { api } from '@/config/axios'

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState<string | null>(null)

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

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <View>
      <Categories 
        onSelected={setCategory}
        selected={category}
        data={categories}
      />
    </View>
  )
}