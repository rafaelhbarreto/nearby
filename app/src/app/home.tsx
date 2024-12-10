import { useEffect } from 'react'
import {View, Text, Alert} from 'react-native'
import { api } from '@/config/axios'

export default function Home() {

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories")
      console.log(data)
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
      <Text>
        Home
      </Text>
    </View>
  )
}