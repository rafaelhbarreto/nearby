import { FlatList, View } from 'react-native'
import { Category } from '../Category'
import { s} from './styles'

export type CategoriesProps = {
  id: string, 
  name: string
}[]

type props = {
  data: CategoriesProps,
  selected: string | null,
  onSelected: (id: string) => void
}

export function Categories({ data, selected, onSelected }: props) {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Category
            iconId={item.id}
            name={item.name}
            onPress={() => onSelected(item.id)}
            isSelected={selected === item.id}
          />   
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={s.content}
        style={s.container}
      />
       
    </View>
  )
}