import { StyleSheet } from 'react-native'

const mentionPhotoSize = 48
const mentionItemContainerHeight = 64

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  return StyleSheet.create({
    mentionItemContainer: {
      width: ' 100%',
      height: mentionItemContainerHeight,
      alignSelf: 'center',
      padding: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    mentionPhotoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    mentionPhoto: {
      height: mentionPhotoSize,
      borderRadius: mentionPhotoSize / 2,
      width: mentionPhotoSize,
    },
    mentionNameContainer: {
      marginLeft: 16,
      height: '100%',
      justifyContent: 'center',
      marginBottom: 8,
    },
    mentionName: {
      color: colorSet.primaryText,
      fontWeight: '600',
      fontSize: 16,
    },
  })
}

export default dynamicStyles
