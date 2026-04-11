import { Dimensions, StyleSheet } from 'react-native'

const { height } = Dimensions.get('window')

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
    },
    listContainer: {
      flex: 1,
    },
    itemContainer: {
      padding: 10,
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
    },
    chatIconContainer: {
      flex: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addFlexContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    divider: {
      bottom: 0,
      left: 70,
      right: 0,
      position: 'absolute',
      height: 0.5,
      backgroundColor: colorSet.hairline,
    },
    photo: {
      height: 48,
      borderRadius: 24,
      width: 48,
    },
    name: {
      marginLeft: 20,
      alignSelf: 'center',
      flex: 1,
      color: colorSet.primaryText,
      fontSize: 16,
      fontWeight: '500',
    },
    chatItemIcon: {
      height: 70,
      // borderRadius: 45,
      width: 70,
    },
    checkContainer: {},
    checked: {
      width: 18,
      height: 18,
    },
    emptyViewContainer: {
      marginTop: height / 6,
    },
  })
}

export default dynamicStyles
