import { StyleSheet, Platform } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.backgroundColor,
    },
    formTitleText: {
      color: colorSet.secondaryText,
      textAlign: 'center',
      marginLeft: 30,
      marginTop: 25,
      fontSize: 28,
    },
  })
}

export default dynamicStyles
