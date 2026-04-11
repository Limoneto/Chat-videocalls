import * as Location from 'expo-location'

export const subscribeToLocationUpdates = callback => {
  return Location.watchPositionAsync({ accuracy: 6 }, callback)
}
