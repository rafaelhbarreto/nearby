import { View, Text } from 'react-native'
import { Welcome } from '@/components/Welcome'
import { Steps } from '@/components/Steps'
import { Button } from '@/components/Button'
import { router } from 'expo-router'

export default function Index() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40}}>
      <Welcome />
      <Steps />
      <Button onPress={ () => router.navigate("/home")}>
        <Button.title>
          Começar
        </Button.title>
      </Button>
    </View>
  )
}