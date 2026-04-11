import React, { useRef } from 'react'
import { View, TextInput, Text } from 'react-native'
import { useTheme } from '../../dopebase'
import dynamicStyles from './styles'

export default function CustomTextInput(props) {
  const {
    editorStyles = {},
    formattedText,
    placeholder,
    placeholderTextColor,
    onChange,
    autoFocus,
    handleSelectionChange,
    numberOfLines = null,
    multiline = true,
    onFocus = () => {},
  } = props
  const inputRef = useRef()

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  props.inputRef.current = inputRef.current

  return (
    <View style={[styles.container, {}]}>
      <TextInput
        ref={inputRef}
        style={[styles.input, editorStyles.input]}
        multiline={multiline}
        autoFocus={autoFocus}
        onFocus={onFocus}
        numberOfLines={numberOfLines}
        clearTextOnFocus={formattedText.length === 0}
        onBlur={props.toggleEditor}
  
        onChangeText={onChange}
        onSelectionChange={handleSelectionChange}
        editable={props.editable}
        onPressIn={props.onPressIn}
        onPressOut={props.onPressOut}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}>
        {formattedText.length > 0 && (
          <Text style={[styles.formmatedText, editorStyles.inputMaskText]}>
            {formattedText}
          </Text>
        )}
      </TextInput>
    </View>
  )
}

CustomTextInput.defaultProps = {
  inputRef: {
    current: {},
  },
}
