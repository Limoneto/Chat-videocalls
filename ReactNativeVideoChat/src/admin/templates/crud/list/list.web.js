import React, { useLayoutEffect, useEffect, useMemo, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Switch,
  Image,
  Dimensions,
} from 'react-native'
import {
  useTheme,
  useTranslations,
  ActivityIndicator,
  Alert,
  EmptyStateView,
  TouchableIcon,
} from '../../../../core/dopebase'
import dynamicStyles from './styles'
import { useCurrentUser } from '../../../../core/onboarding'
import { useEntities } from '../../../backend/firebase'

const headings = [
  /* INSERT_LIST_FORM_HEADINGS */
]

export const ListEntitiesScreen = ({ navigation, route }) => {
  const currentUser = useCurrentUser()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const TDWidth =
    (Dimensions.get('window').width * 0.9) / (headings?.length + 1)

  const {
    subscribeToEntities,
    loadMoreEntities,
    loading,
    entities,
    removeEntity,
  } = useEntities()

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
    const unsubscribe = subscribeToEntities()
    return () => unsubscribe()
  }, [currentUser?.id])

  const actionBtnOptions = useMemo(
    () => [
      {
        iconName: 'view',
        onPress: (entity, navigation) => {
          navigation.navigate('ViewEntityScreen', { id: entity.id, entity })
        },
        backgroundColor: 'rgb(26, 152, 174)',
      },
      {
        iconName: 'edit',
        onPress: (entity, navigation) => {
          console.log('edit', entity)
          navigation.navigate('EditEntityScreen', { id: entity.id, entity })
        },
        backgroundColor: 'rgb(41, 157, 68)',
      },
      {
        iconName: 'delete',
        onPress: (entity, navigation) => {
          Alert.alert(
            localized(''),
            localized('Are you sure you want to delete this entity?'),
            [
              {
                text: localized('Yes'),
                onPress: async () => {
                  await removeEntity(entity.id)
                },
              },
              {
                text: localized('Cancel'),
                style: 'cancel',
              },
            ],
          )
        },
        backgroundColor: 'rgb(215, 45, 62)',
      },
    ],
    [removeEntity, localized],
  )

  const emptyStateConfig = useMemo(() => {
    return {
      title: localized('No Entities'),
      description: localized(
        'There are currently no entities. All entities will appear here.',
      ),
    }
  }, [localized])

  const flatListHeader = () => (
    <View style={styles.headerContainer}>
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

  const renderActions = entity => (
    <View style={[styles.actionsContainer, { width: TDWidth }]}>
      {actionBtnOptions.map((item, index) => (
        <TouchableIcon
          containerStyle={{
            backgroundColor: item.backgroundColor,
            marginRight: 5,
          }}
          imageStyle={styles.actionImageStyle}
          iconSource={theme.icons[item.iconName]}
          onPress={() => item.onPress(entity, navigation)}
        />
      ))}
    </View>
  )

  const renderItem = ({ item: entity, index }) => {
    const colorSet = theme.colors[appearance]
    return (
      <View key={index} style={styles.entityContainer}>
        {headings?.map((item, idx) => {
          if (item?.type === 'string') {
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
                {new Date(entity[item?.key] * 1000).toLocaleDateString()}
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
          } else if (item?.type === 'foreignKey') {
            const foreignObject = entity[item?.key]
            return (
              <View style={styles.entityValueContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(item?.landingScreen, {
                      id: foreignObject.id,
                      entity: foreignObject,
                    })
                  }}>
                  {item.renderer(foreignObject, styles)}
                </TouchableOpacity>
              </View>
            )
          } else if (item?.type === 'photo') {
            if (entity[item?.key]?.downloadURL?.length > 0) {
              return (
                <View
                  style={{
                    marginRight: 20,
                    alignSelf: 'center',
                    width: TDWidth,
                    justifyContent: 'center',
                  }}>
                  <Image
                    key={idx}
                    source={{ uri: entity[item?.key]?.downloadURL }}
                    style={{ height: 64, width: 64, borderRadius: 8 }}
                    resizeMode={'cover'}
                  />
                </View>
              )
            }
            return null
          } else if (item?.type === 'photos') {
            return (
              <View
                style={{
                  marginRight: 20,
                  alignSelf: 'center',
                  width: TDWidth,
                  justifyContent: 'center',
                }}>
                {entity[item?.key]?.map((photo, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: photo.downloadURL }}
                    style={{ height: 150, width: '100%' }}
                    resizeMode={'cover'}
                  />
                ))}
              </View>
            )
          } else if (item?.type === 'videos') {
            return (
              <View
                style={{
                  marginRight: 20,
                  alignSelf: 'center',
                  width: TDWidth,
                  justifyContent: 'center',
                }}>
                {entity[item?.key]?.map((video, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: video?.thumbnailURL }}
                    style={{ height: 150, width: '100%' }}
                    resizeMode={'cover'}
                  />
                ))}
              </View>
            )
          }
        })}
        {renderActions(entity)}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.titleText}>{localized(`Manage Entities`)}</Text>
        <TouchableOpacity
          style={styles.addNewTextContainer}
          onPress={() => navigation.navigate('AddEntityScreen')}>
          <Text style={styles.addNewText}>{localized('Add New')}</Text>
        </TouchableOpacity>
        {(entities?.length ?? 0) > 0 && (
          <FlatList
            style={styles.flatList}
            stickyHeaderIndices={[0]}
            data={entities}
            renderItem={renderItem}
            ListHeaderComponent={flatListHeader}
            onEndReached={() => loadMoreEntities()}
          />
        )}
        {!loading && (entities?.length ?? 0) === 0 && (
          <View style={styles.emptyViewContainer}>
            <EmptyStateView emptyStateConfig={emptyStateConfig} />
          </View>
        )}
      </View>
      {loading && <ActivityIndicator />}
    </View>
  )
}
