import React, {useRef} from "react";
import { Text, useWindowDimensions } from 'react-native'
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Place, PlaceProps } from '../Place'
import { s } from "./styles";

type Props = {
  data: PlaceProps[]
}

export function Places({ data }: Props) {
  console.log('errorasdasd', data)
  const dimensions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)
  
  const snapPoints = {
    min: 278,
    max: dimensions.height - 128
  }

  return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[snapPoints.min, snapPoints.max]}
        handleIndicatorStyle={s.indicator}
        backgroundStyle={s.container}
        enableOverDrag={false}
      >
        <BottomSheetFlatList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Place data={item} />}
          contentContainerStyle={s.content}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <Text>Explore lugares perto de você!</Text>}
        />

      </BottomSheet>
  )
}