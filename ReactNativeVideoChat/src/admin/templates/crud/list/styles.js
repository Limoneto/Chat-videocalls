import { StyleSheet, Dimensions, Platform } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  const fontSizes = theme.fontSizes
  const fontWeights = theme.fontWeights
  const windowWidth = Dimensions.get('window').width

  return StyleSheet.create({
    emptyViewContainer: {
      marginTop: '25%',
      flex: 1,
    },
    itemText: {
      color: colorSet.primaryForeground,
    },
    ...Platform.select({
      web: {
        listContainer: {
          backgroundColor: colorSet.secondaryBackground,
          flex: 1,
          margin: 8,
          borderRadius: 15,
          paddingHorizontal: 30,
        },
        flatList: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 2.22,
          elevation: 3,
        },
        addNewTextContainer: {
          alignSelf: 'flex-end',
          marginBottom: 25,
        },
        addNewText: {
          fontSize: fontSizes.l,
          color: colorSet.primaryForeground,
        },
        headerContainer: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: colorSet.primaryBackground,
          backgroundColor: colorSet.secondaryBackground,
          padding: 12,
          textTransform: 'uppercase',
        },
        entityContainer: {
          backgroundColor: colorSet.secondaryBackground,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: colorSet.primaryBackground,
          paddingVertical: 16,
        },
        headerTitleText: {
          textAlign: 'center',
          fontSize: fontSizes.l,
          color: colorSet.primaryForeground,
          fontWeight: fontWeights.m,
          marginRight: 20,
        },
        entityText: {
          textAlign: 'center',
          color: colorSet.primaryText,
          marginRight: 20,
          alignSelf: 'center',
        },
        actionsContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        actionImageStyle: {
          width: 15,
          height: 15,
          margin: 3,
          tintColor: colorSet.primaryText,
        },
      },
      default: {
        flatList: {
          flex: 1,
          paddingTop: 8,
        },
        entityContainer: {
          flex: 1,
          backgroundColor: colorSet.primaryBackground,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingVertical: 8,
          marginBottom: 12,
          paddingHorizontal: 12,
          borderBottomWidth: 1,
          borderColor: colorSet.primaryBackground,
          borderBottomColor: colorSet.grey3,
        },
        entityText: {
          fontSize: 16,
          color: colorSet.primaryText,
          fontWeight: '500',
        },
        entityDate: {
          color: colorSet.secondaryText,
          fontSize: 14,
        },
        entityValueContainer: {
          marginHorizontal: 8,
          marginBottom: 4,
          alignSelf: 'center',
          alignItems: 'center',
        },
        entityHeading: {
          fontWeight: fontWeights.m,
          fontSize: fontSizes.m,
          marginBottom: 5,
        },
        actionSheetContainer: {
          borderRadius: 20,
          backgroundColor: colorSet.secondaryBackground,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 128,
          width: windowWidth,
          alignSelf: 'center',
          ...Platform.select({
            ios: {
              position: 'absolute',
              bottom: 0,
            },
            android: {
              marginTop: '6%',
            },
          }),
        },
        threadItemActionSheetOptionsText: {
          color: colorSet.primaryForeground,
          fontSize: fontSizes.m,
          fontWeight: fontWeights.m,
        },
        modal: {
          margin: 0,
        },
      },
    }),
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      paddingTop: 20,
    },
    titleText: {
      ...Platform.select({
        web: {},
        default: {
          textAlign: 'center',
          marginBottom: 16,
        },
      }),
      color: colorSet.primaryText,
      marginTop: 25,
      fontSize: fontSizes.xl,
    },
  })
}

export default dynamicStyles
