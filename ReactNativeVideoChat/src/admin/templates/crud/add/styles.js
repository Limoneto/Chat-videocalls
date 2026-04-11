import { StyleSheet, Platform } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  return StyleSheet.create({
    container: {
      backgroundColor: colorSet.backgroundColor,
      ...Platform.select({
        web: {
          maxWidth: 1024,
          margin: 32,
          borderWidth: 1,
          shadowColor: colorScheme === 'dark' ? '#fff' : '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 2.22,
          elevation: 3,
          paddingHorizontal: 32,
          paddingBottom: 32,
        },
        default: {
          flex: 1,
        },
      }),
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
