const formatMessage = (message, localized) => {
  const type = message?.media?.type
  if (type) {
    if (type.includes('video')) {
      return localized('Someone sent a video.')
    } else if (type.includes('audio')) {
      return localized('Someone sent an audio.')
    } else if (type.includes('image')) {
      return localized('Someone sent a photo.')
    } else if (type.includes('file')) {
      return localized('Someone sent a file.')
    }
  }
  if (message?.content && message?.content?.length > 0) {
    return message?.content
  } else if (message && message.length > 0) {
    return message
  } else if (message) {
    return JSON.stringify(message)
  }
  return ''
}

export { formatMessage }
