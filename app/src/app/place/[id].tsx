import { View, Text, Alert, Modal } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import { api } from '@/config/axios';
import { useEffect, useRef, useState } from 'react';
import { Loading } from '@/components/Loading';
import { Cover } from '@/components/Place/Cover';
import { Details, PropsDetails } from '@/components/Place/Details';
import { Coupon } from '@/components/Place/Coupon';
import { Button } from '@/components/Button';
import { CameraView, useCameraPermissions } from 'expo-camera'

type PlaceProps = PropsDetails & {
  cover: string 
}

export default function Place() {
  const [place, setPlace] = useState<PlaceProps>()
  const [loading, setLoading] = useState(true)
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isOpenCameraModal, setIsOpenCameraModal] = useState(false)
  const [isCouponFetching, setIsCouponFetching] = useState(false)
  const [_, requestCameraPermissions] = useCameraPermissions()
  const params = useLocalSearchParams<{id: string}>()
  const isQrLocked = useRef(false)

  async function handleOpenCamera() {
    try {
      const { granted } = await requestCameraPermissions()

      if (!granted) {
        return Alert.alert('Câmera', 'É necessário permitir o acesso a câmera para ler o QR Code')
      }

      isQrLocked.current = false
      setIsOpenCameraModal(true)
    } catch (err) {
      console.log(err)
      Alert.alert('Câmera', 'Não foi possível utilizar a câmera.')
    }
  }


  async function getCoupon(id: string) {
    try { 
      
      setIsCouponFetching(true)
      const { data } = await api.patch('/coupons/' + id)
      setCoupon(data.coupon)
    } catch (err) {
      console.log(err)
      Alert.alert('Erro', 'Não foi possível buscar o cupon')
    } finally {
      setIsCouponFetching(false)
    }
  }


  async function fetchPlace() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setPlace(data)
    } catch (err) {
      console.log(err)
      Alert.alert('Erro ao buscar lugar', 'Tente novamente mais tarde', [
        { text: 'Ok', onPress: () => { router.back() } }
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsOpenCameraModal(false)


    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja resgatar um novo cupom?",
      [
        { style: "cancel", text: "Não" },
        { text: "sim", onPress: () => getCoupon(id) },
      ]
    )
  }

  useEffect(() => {
    fetchPlace()
  }, [params.id])

  if (loading) {
    return <Loading />
  }

  if(!place) {
    return <Redirect href={'/home'}  />
  }

  return (
    <View style={{flex: 1}}>
      <Cover uri={place.cover} />
      <Details data={place} />
      {coupon && <Coupon code={coupon} />}

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.title>
            Ler QR Code
          </Button.title>
        </Button>
      </View>

      <Modal style={{flex:1}} visible={isOpenCameraModal}>
        <CameraView 
          style={{flex: 1}} 
          facing='back'
          onBarcodeScanned={({data}) => {
            if (data && !isQrLocked.current) {
              isQrLocked.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }}
        />

        <View style={{position: 'absolute', bottom: 32, left: 32, right: 32}}>
          <Button 
            onPress={() => setIsOpenCameraModal(false)}
            isLoading={isCouponFetching}
          >
            <Button.title>
              Fechar
            </Button.title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}