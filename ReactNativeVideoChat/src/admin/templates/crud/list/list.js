import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import {
  View,
  Text,
  FlatList,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native'
import moment from 'moment'
import Modal from 'react-native-modal'
import {
  useTranslations,
  useTheme,
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
  const {
    subscribeToEntities,
    loadMoreEntities,
    loading,
    entities,
    removeEntity,
  } = useEntities()
  const currentUser = useCurrentUser()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [selectedEntity, setSelectedEntity] = useState(null)

  useLayoutEffect(() => {
    const colors = theme.colors[appearance]
    navigation.setOptions({
      headerTitle: localized(`Manage Entities`),
      headerRight: () => (
        <TouchableIcon
          imageStyle={{ tintColor: colors.primaryText }}
          iconSource={theme.icons.inscription}
          onPress={() => navigation.navigate('AddEntityScreen')}
        />
      ),
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

  const actionSheetOptions = useMemo(
    () => [
      {
        title: 'View',
        onPress: entity => {
          navigation.navigate('ViewEntityScreen', { id: entity.id, entity })
        },
      },
      {
        title: 'Edit',
        onPress: entity => {
          navigation.navigate('EditEntityScreen', { id: entity.id, entity })
        },
      },
      {
        title: 'Delete',
        onPress: entity => {
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
      },
    ],
    [navigation, localized, removeEntity],
  )

  const emptyStateConfig = useMemo(() => {
    return {
      title: localized('No Entities'),
      description: localized(
        'There are currently no entities. All entities will appear here.',
      ),
    }
  }, [localized])

  const renderItem = ({ item: entity, index }) => {
    const colorSet = theme.colors[appearance]
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={index}
        style={styles.entityContainer}
        onPress={() => setSelectedEntity(entity)}>
        {headings?.map((item, idx) => {
          if (item?.type === 'string') {
            return (
              <View style={styles.entityValueContainer}>
                {/* <Text style={styles.entityHeading}>
                  {localized(item?.label)}
                </Text> */}
                <Text style={styles.entityText} numberOfLines={2}>
                  {entity[item?.key]}
                </Text>
              </View>
            )
          } else if (item?.type === 'switch') {
            return (
              <View style={styles.entityValueContainer}>
                {/* <Text style={styles.entityHeading}>
                  {localized(item?.label)}
                </Text> */}
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
              <View style={styles.entityValueContainer}>
                {/* <Text style={styles.entityHeading}>
                  {localized(item?.label)}
                </Text> */}
                <Text style={styles.entityDate} numberOfLines={2}>
                  {new Date(entity[item?.key] * 1000).toLocaleDateString()}
                </Text>
              </View>
            )
          } else if (item?.type === 'list') {
            return (
              <View style={styles.entityValueContainer}>
                <Text style={styles.entityHeading}>
                  {localized(item?.label)}
                </Text>
                {entity[item?.key]?.map((option, idx) => (
                  <Text key={idx} style={styles.entityText} numberOfLines={2}>
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
                <View style={styles.entityValueContainer}>
                  {/* <Text style={styles.entityHeading}>
                    {localized(item?.label)}
                  </Text> */}
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
              <View style={styles.entityValueContainer}>
                <Text style={styles.entityHeading}>
                  {localized(item?.label)}
                </Text>
                {entity[item?.key]?.map((photo, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: photo.downloadURL }}
                    style={{ height: 150, width: 200 }}
                    resizeMode={'cover'}
                  />
                ))}
              </View>
            )
          } else if (item?.type === 'videos') {
            return (
              <View style={styles.entityValueContainer}>
                <Text style={styles.entityHeading}>
                  {localized(item?.label)}
                </Text>
                {entity[item?.key]?.map((video, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: video?.thumbnailURL }}
                    style={{ height: 150, width: 200 }}
                    resizeMode={'cover'}
                  />
                ))}
              </View>
            )
          }
        })}
      </TouchableOpacity>
    )
  }

  const actionSheet = useCallback(() => {
    return (
      <Modal
        style={styles.modal}
        transparent={true}
        animationType={'slide'}
        onBackdropPress={() => setSelectedEntity(null)}
        isVisible={selectedEntity != null}
        onDismiss={() => setSelectedEntity(null)}>
        <View style={styles.actionSheetContainer}>
          {actionSheetOptions?.map(item => {
            return (
              <TouchableOpacity
                key={item.title}
                onPress={() => {
                  const entity = selectedEntity
                  setSelectedEntity(null)
                  item.onPress(entity)
                }}>
                <Text style={styles.threadItemActionSheetOptionsText}>
                  {localized(item.title)}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </Modal>
    )
  }, [selectedEntity])

  return (
    <View style={styles.container}>
      {(entities?.length ?? 0) > 0 && (
        <FlatList
          data={entities}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onEndReached={() => loadMoreEntities()}
          style={styles.flatList}
        />
      )}
      {actionSheet()}
      {loading && <ActivityIndicator />}
      {!loading && (entities?.length ?? 0) === 0 && (
        <View style={styles.emptyViewContainer}>
          <EmptyStateView emptyStateConfig={emptyStateConfig} />
        </View>
      )}
    </View>
  )
}
