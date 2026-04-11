import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
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
  TouchableIcon,
  ActivityIndicator,
} from '../../../../core/dopebase'
import dynamicStyles from './styles'
import { useCurrentUser } from '../../../../core/onboarding'
import { useAdminEntity } from '../../../backend/firebase'

const ActionSheetOptions = ['View', 'Edit', 'Delete']

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
  const { subscribeToEntities, loadMoreEntities, loading, entities } =
    useAdminEntity()
  const currentUser = useCurrentUser()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(() => {
    const colors = theme.colors[appearance]
    navigation.setOptions({
      headerTitle: localized('List'),
      headerRight: () => (
        <TouchableIcon
          imageStyle={{ tintColor: colors.primaryText }}
          iconSource={theme.icons.inscription}
          onPress={() => navigation.navigate('AdminAddEntity', { categoryID })}
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
    subscribeToEntities(categoryID)
  }, [currentUser?.id])

  const renderItem = ({ item: entity, index }) => {
    const colorSet = theme.colors[appearance]
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        key={index}
        style={styles.entityContainer}
        onPress={() => setIsVisible(true)}>
        {headings?.map((item, idx) => {
          if (item?.type === 'text') {
            return (
              <View style={styles.entityValueContainer}>
                <Text style={styles.entityHeading}>
                  {localized(item?.label)}
                </Text>
                <Text style={styles.entityText} numberOfLines={2}>
                  {entity[item?.key]}
                </Text>
              </View>
            )
          } else if (item?.type === 'switch') {
            return (
              <View style={styles.entityValueContainer}>
                <Text style={styles.entityHeading}>
                  {localized(item?.label)}
                </Text>
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
                <Text style={styles.entityHeading}>
                  {localized(item?.label)}
                </Text>
                <Text style={styles.entityText} numberOfLines={2}>
                  {moment(entity[item?.key]).format('MMMM Do YYYY, h:mm:ss a')}
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
          } else if (item?.type === 'media') {
            return (
              <View style={styles.entityValueContainer}>
                <Text style={styles.entityHeading}>
                  {localized(item?.label)}
                </Text>
                {entity[item?.key]?.map((image, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: image?.thumbnailURL }}
                    style={{ height: 150, width: 200 }}
                    resizeMode={'stretch'}
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
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}>
        <View style={styles.actionSheetContainer}>
          {ActionSheetOptions?.map((item, index) => {
            return (
              <TouchableOpacity
                key={item + index}
                onPress={() => setIsVisible(false)}>
                <Text style={styles.threadItemActionSheetOptionsText}>
                  {localized(item)}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </Modal>
    )
  }, [isVisible])

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{localized(title)}</Text>
      <FlatList
        data={entities}
        renderItem={renderItem}
        onEndReached={() => loadMoreEntities(categoryID)}
      />
      {actionSheet()}
      {loading && <ActivityIndicator />}
    </View>
  )
}
