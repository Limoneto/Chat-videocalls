import { StyleSheet, Dimensions, Platform } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  return StyleSheet.create({
    mainContainer: {
      backgroundColor: colorSet.primaryBackground,
      flexDirection: 'row',
      flex: 1,
    },
    item: {
      ...Platform.select({
        web: {
          height: windowWidth * 0.07,
          width: windowWidth * 0.07,
        },
        default: {
          height: windowWidth * 0.2,
          width: windowWidth * 0.2,
        },
      }),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorSet.primaryForeground,
      borderRadius: 20,
      marginTop: windowHeight * 0.04,
      marginLeft: windowWidth * 0.07,
    },
    itemText: {
      color: colorSet.foregroundContrast,
      fontWeight: 'bold',
      fontSize: 15,
    },
  })
}

export default dynamicStyles
