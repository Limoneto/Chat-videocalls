import * as Location from 'expo-location'

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    return { coords: { latitude: '', longitude: '' } }
  }

  try {
    const location = await Location.getCurrentPositionAsync({})
    return location
  } catch (error) {
    console.log(error)
    return null
  }
}
