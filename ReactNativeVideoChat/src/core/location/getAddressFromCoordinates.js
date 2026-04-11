export const getAddressFromCoordinates = async (
  latitude,
  longitude,
  googleApiKey,
) => {
  const url = `https://maps.google.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`
  const response = await fetch(url)
  const json = await response.json()
  console.log(json)

  const choosenIndex = Math.floor(json.results.length / 2)
  const address_components = json.results[choosenIndex].address_components
  const formatted_address = json.results[choosenIndex].formatted_address
  const addresses = getAddresses(json.results)
  return { address_components, formatted_address, addresses }
}

const getAddresses = addresses => {
  const newAddreses = []
  addresses.slice(-8).forEach(address => {
    newAddreses.push({
      address_components: address.address_components,
      formatted_address: address.formatted_address,
    })
  })

  return newAddreses
}
