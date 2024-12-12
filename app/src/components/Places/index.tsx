import React, {useRef} from "react";
import { useWindowDimensions } from 'react-native'
import { Place, PlaceProps } from '../Place'
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";


type Props = {
  data: PlaceProps[]
}

export function Places({ data }: Props) {
  console.log('errorasdasd', data)
  const dimensions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)
  
  return (
      <BottomSheet>
        <BottomSheetFlatList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Place data={item} />}
        />

      </BottomSheet>
  )
}