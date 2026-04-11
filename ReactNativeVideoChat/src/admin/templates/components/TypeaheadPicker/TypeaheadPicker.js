import React, { useState, useRef, useEffect } from 'react'
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTheme, useTranslations } from '../../../core/dopebase/core'
import dynamicStyles from './styles'
import { useEntities } from '../../backend'

const TypeaheadPicker = ({ onSelect, originalSelectedItem = [] }) => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const dropdownButton = useRef()

  const { entities, loading, subscribeToEntities } = useEntities()
  const [selectedItem, setSelectedItem] = useState(originalSelectedItem)
  const [showDropDown, setShowDropDown] = useState(false)
  const [dropdownLocation, setDropdownLocation] = useState(0)

  useEffect(() => {
    const ref = subscribeToEntities()
    return () => ref()
  }, [])

  const onDropdownItemPress = item => {
    setSelectedItem(item)
    setShowDropDown(false)
  }

  const onDropDownDismiss = () => {
    onSelect(selectedItem)
  }

  const toggleDropdown = () => {
    showDropDown ? setShowDropDown(false) : openDropdown()
  }

  const openDropdown = () => {
    dropdownButton.current.measure((fx, fy, w, h, px, py) => {
      setDropdownLocation({ top: py + h, left: px })
    })
    setShowDropDown(true)
  }

  const renderDropdown = () => {
    return (
      <Modal
        visible={showDropDown}
        onDismiss={onDropDownDismiss}
        transparent
        animationType="none">
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlay}
          onPress={() => setShowDropDown(false)}>
          <View style={styles.shadowContainer}>
            <View style={[styles.dropdown, dropdownLocation]}>
              {loading && (
                <ActivityIndicator
                  color={styles.minimumAudioTrackTintColor.color}
                />
              )}

              {entities && (
                <ScrollView activeOpacity={1}>
                  {entities.map(currentItem => {
                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => onDropdownItemPress(currentItem)}
                        key={currentItem.id}
                        style={[
                          selectedItem?.id === currentItem?.id && {
                            backgroundColor: theme.colors[appearance].grey0,
                          },
                          styles.item,
                        ]}>
                        {/* INSERT_TYPEAHEAD_RENDER_FIELD_ITEM */}
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  const currentItem = selectedItem

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{localized('Entity')}</Text>
      </View>
      <View style={styles.listContainer}>
        <TouchableOpacity
          ref={dropdownButton}
          activeOpacity={1}
          onPress={toggleDropdown}
          style={styles.selectedItemContainer}>
          {currentItem &&
            (
              /* INSERT_TYPEAHEAD_RENDER_FIELD_ITEM */
            )}
          {!selectedItem && (
            <Text style={styles.itemText}>{localized('Select Entity')}</Text>
          )}
        </TouchableOpacity>
        {renderDropdown()}
      </View>
    </View>
  )
}

export default TypeaheadPicker