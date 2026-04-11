import { StyleSheet, Dimensions, Platform } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  const fontSizes = theme.fontSizes
  const fontWeights = theme.fontWeights
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  return StyleSheet.create({
    ...Platform.select({
      web: {
        listContainer: {
          backgroundColor: colorSet.secondaryBackground,
          flex: 1,
          margin: windowWidth * 0.02,
          borderRadius: 15,
          paddingHorizontal: 30,
        },
        addNewTextContainer: {
          alignSelf: 'flex-end',
          marginBottom: 25,
        },
        addNewText: {
          fontSize: fontSizes.l,
          color: colorSet.primaryForeground,
        },
        headerTitleContainer: {
          backgroundColor: colorSet.secondaryBackground,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: colorSet.primaryBackground,
          paddingVertical: windowHeight * 0.02,
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
        entityContainer: {
          backgroundColor: colorSet.primaryForeground,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          paddingVertical: windowHeight * 0.02,
          marginBottom: windowHeight * 0.03,
          borderRadius: 20,
          marginHorizontal: windowWidth * 0.03,
        },
        entityText: {
          color: colorSet.primaryText,
        },
        entityValueContainer: {
          backgroundColor: colorSet.secondaryBackground,
          marginHorizontal: windowWidth * 0.02,
          marginBottom: windowHeight * 0.01,
          paddingHorizontal: windowWidth * 0.04,
          paddingVertical: windowHeight * 0.01,
          borderRadius: 15,
          alignSelf: 'flex-start',
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
          height: windowHeight * 0.1,
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
    },
    titleText: {
      ...Platform.select({
        web: {},
        default: {
          textAlign: 'center',
          marginBottom: windowHeight * 0.03,
        },
      }),
      color: colorSet.primaryText,
      marginTop: 25,
      fontSize: fontSizes.xl,
    },
  })
}

export default dynamicStyles
