import { useEffect, useState } from 'react'
import {View, Alert, Text} from 'react-native'
import { api } from '@/config/axios'
import { Categories, CategoriesProps } from '@/components/Categories'
import { PlaceProps } from '@/components/Place'
import { Places } from '@/components/Places'
import MapView, { Callout, Marker } from 'react-native-maps'
import { colors, fontFamily } from '@/styles/theme'
import { router } from 'expo-router'

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState<string | null>(null)
  const [places, setPlaces] = useState<PlaceProps[]>([])

  const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494
  }
  
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

      <MapView 
        style={{ flex: 1}}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Marker 
          identifier='current'
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
          }}
          image={require('@/assets/location.png')}
        />

        {places.map(place => (
          <Marker 
            key={place.id}
            identifier={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude
            }}
            image={require('@/assets/pin.png')}
          >
            <Callout onPress={() => router.navigate(`/place/${place.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.gray[600],
                    fontFamily: fontFamily.bold
                  }}
                >{ place.name }</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular
                  }}
                >{ place.address }</Text>
              </View>
            </Callout>
          </Marker>
          
        ))}

      </MapView>

      <Places data={places}/>
    </View>
  )
}