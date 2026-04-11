import React, { useState, useRef, useMemo } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Platform,
} from 'react-native'
import ImageView from 'react-native-image-viewing'
import { Image } from 'expo-image'

import { useActionSheet, useTheme, useTranslations } from '../../..'
import dynamicStyles from './styles'

const defaultProfilePhotoURL =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

export const ProfilePictureSelector = props => {
  const [profilePictureURL, setProfilePictureURL] = useState(
    props.profilePictureURL?.length > 0
      ? props.profilePictureURL
      : defaultProfilePhotoURL,
  )

  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false)
  const [tappedImage, setTappedImage] = useState([])
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { showActionSheetWithOptions } = useActionSheet()

  const actionSheetOptions = useMemo(() => {
    return {
      title: localized('Confirm action'),
      options: [
        localized('Change Profile Photo'),
        localized('Cancel'),
        localized('Remove Profile Photo'),
      ],
      cancelButtonIndex: 1,
      destructiveButtonIndex: 2,
    }
  }, [])

  const handleProfilePictureClick = url => {
    if (url) {
      const isAvatar = url.search('avatar')
      const image = { uri: url }

      if (isAvatar === -1) {
        setTappedImage(image)
        setIsImageViewerVisible(true)
      } else {
        showActionSheet()
      }
    } else {
      showActionSheet()
    }
  }

  const onImageError = () => {
    console.log('Error loading profile photo at url ' + profilePictureURL)
    alert(
      'There was an error in uploading your profile photo. Please try a different image',
    )

    // Back to original photo after erroring out
    setProfilePictureURL(
      props.profilePictureURL?.length > 0
        ? props.profilePictureURL
        : defaultProfilePhotoURL,
    )
  }

  const getPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync(false)

      if (permissionResult.granted === false) {
        alert(
          localized(
            'Sorry, we need camera roll permissions to make this work.',
          ),
        )
      }
    }
  }

  const onPressAddPhotoBtn = async () => {
    await getPermissionAsync()

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    })

    if (result.canceled !== true) {
      const asset = result.assets[0]
      setProfilePictureURL(asset.uri)
      props.setProfilePictureFile(asset)
    }
  }

  const showActionSheet = index => {
    showActionSheetWithOptions(
      {
        title: actionSheetOptions.title,
        options: actionSheetOptions.options,
        cancelButtonIndex: actionSheetOptions.cancelButtonIndex,
        destructiveButtonIndex: actionSheetOptions.destructiveButtonIndex,
      },
      onActionDone,
    )
  }

  const onActionDone = index => {
    if (index == 0) {
      onPressAddPhotoBtn()
    }
    if (index == 2) {
      // Remove button
      if (profilePictureURL) {
        setProfilePictureURL(null)
        props.setProfilePictureFile(null)
      }
    }
  }

  return (
    <>
      <View style={styles.imageBlock}>
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => handleProfilePictureClick(profilePictureURL)}>
          <Image
            style={[styles.image, { opacity: profilePictureURL ? 1 : 0.3 }]}
            source={
              profilePictureURL
                ? { uri: profilePictureURL }
                : theme.icons.userAvatar
            }
            contentFit="cover"
            onError={onImageError}
          />
        </TouchableHighlight>

        <TouchableOpacity onPress={showActionSheet} style={styles.addButton}>
          <Image style={styles.cameraIcon} source={theme.icons.cameraFilled} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageView
          images={[tappedImage]}
          visible={isImageViewerVisible}
          onRequestClose={() => setIsImageViewerVisible(false)}
        />
      </ScrollView>
    </>
  )
}
