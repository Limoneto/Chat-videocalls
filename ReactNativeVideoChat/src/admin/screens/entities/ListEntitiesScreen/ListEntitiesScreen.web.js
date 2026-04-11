import React, { useLayoutEffect, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Switch,
  Image,
  Dimensions,
} from 'react-native'
import moment from 'moment'
import {
  useTheme,
  useTranslations,
  TouchableIcon,
  ActivityIndicator,
} from '../../../../core/dopebase'
import dynamicStyles from './styles'
import { useCurrentUser } from '../../../../core/onboarding'
import { useAdminEntity } from '../../../backend/firebase'

const ActionBtnOptions = [
  {
    iconName: 'view',
    navigateTo: '',
    backgroundColor: 'rgb(26, 152, 174)',
  },
  {
    iconName: 'edit',
    navigateTo: '',
    backgroundColor: 'rgb(41, 157, 68)',
  },
  {
    iconName: 'delete',
    navigateTo: '',
    backgroundColor: 'rgb(215, 45, 62)',
  },
]

const headings = [
  {
    key: 'name',
    label: 'User Name',
    type: 'text',
  },
  {
    key: 'age',
    label: 'Age',
    type: 'text',
  },
  {
    key: 'isSwitch',
    label: 'Is Free?',
    type: 'switch',
  },
  {
    key: 'createdAt',
    label: 'Created At',
    type: 'date',
  },
  {
    key: 'selectedOption',
    label: 'Foods',
    type: 'list',
  },
  {
    key: 'date',
    label: 'Expiry Date',
    type: 'text',
  },
  {
    key: 'media',
    label: 'Pictures',
    type: 'media',
  },
]

export const ListEntitiesScreen = ({ navigation, route }) => {
  const {
    params: { title, categoryID },
  } = route
  const currentUser = useCurrentUser()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const TDWidth =
    (Dimensions.get('window').width * 0.9) / (headings?.length + 1)
  const { subscribeToEntities, loadMoreEntities, loading, entities } =
    useAdminEntity()

  useLayoutEffect(() => {
    const colors = theme.colors[appearance]
    navigation.setOptions({
      headerTitle: localized('List'),
      headerStyle: {
        backgroundColor: colors.primaryBackground,
      },
      headerTintColor: colors.primaryText,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    subscribeToEntities(categoryID)
  }, [currentUser?.id])

  const flatListHeader = () => (
    <View style={styles.headerTitleContainer}>
      {headings?.map((item, index) => (
        <Text key={index} style={[styles.headerTitleText, { width: TDWidth }]}>
          {localized(item?.label)}
        </Text>
      ))}
      <Text
        key={'ACTIONS' + 1}
        style={[styles.headerTitleText, { width: TDWidth }]}>
        {localized('Actions')}
      </Text>
    </View>
  )

  const renderActions = () => (
    <View style={[styles.actionsContainer, { width: TDWidth }]}>
      {ActionBtnOptions.map((item, index) => (
        <TouchableIcon
          containerStyle={{
            backgroundColor: item.backgroundColor,
            marginRight: 5,
          }}
          imageStyle={styles.actionImageStyle}
          iconSource={theme.icons[item.iconName]}
          onPress={() => navigation.navigate(item.navigateTo)}
        />
      ))}
    </View>
  )

  const renderItem = ({ item: entity, index }) => {
    const colorSet = theme.colors[appearance]
    return (
      <View key={index} style={styles.headerTitleContainer}>
        {headings?.map((item, idx) => {
          if (item?.type === 'text') {
            return (
              <Text
                style={[styles.entityText, { width: TDWidth }]}
                numberOfLines={4}>
                {localized(entity[item?.key])}
              </Text>
            )
          } else if (item?.type === 'switch') {
            return (
              <View
                style={{
                  marginRight: 20,
                  alignSelf: 'center',
                  width: TDWidth,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'blue',
                }}>
                <Switch
                  disabled={true}
                  trackColor={{
                    false: 'rgb(159,159,159)',
                    true: colorSet.primaryForeground,
                  }}
                  value={entity[item?.key]}
                />
              </View>
            )
          } else if (item?.type === 'date') {
            return (
              <Text
                style={[styles.entityText, { width: TDWidth }]}
                numberOfLines={4}>
                {moment(entity[item?.key]).format('MMMM Do YYYY, h:mm:ss a')}
              </Text>
            )
          } else if (item?.type === 'list') {
            return (
              <View
                style={{
                  alignSelf: 'center',
                  width: TDWidth,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'green',
                  marginRight: 20,
                }}>
                {entity[item?.key]?.map((option, idx) => (
                  <Text
                    key={idx + option}
                    style={[styles.entityText, { marginRight: 0 }]}
                    numberOfLines={4}>
                    {option}
                  </Text>
                ))}
              </View>
            )
          } else if (item?.type === 'media') {
            return (
              <View
                style={{
                  marginRight: 20,
                  alignSelf: 'center',
                  width: TDWidth,
                  justifyContent: 'center',
                  backgroundColor: 'yellow',
                }}>
                {entity[item?.key]?.map((image, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: image?.thumbnailURL }}
                    style={{ height: 150, width: '100%' }}
                    resizeMode={'stretch'}
                  />
                ))}
              </View>
            )
          }
        })}
        {renderActions()}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.titleText}>{localized(route.params.title)}</Text>
        <TouchableOpacity
          style={styles.addNewTextContainer}
          onPress={() => navigation.navigate('AdminAddEntity')}>
          <Text style={styles.addNewText}>{localized('Add New')}</Text>
        </TouchableOpacity>
        <FlatList
          stickyHeaderIndices={[0]}
          data={entities}
          renderItem={renderItem}
          ListHeaderComponent={flatListHeader}
          onEndReached={() => loadMoreEntities(categoryID)}
        />
      </View>
      {loading && <ActivityIndicator />}
    </View>
  )
}
