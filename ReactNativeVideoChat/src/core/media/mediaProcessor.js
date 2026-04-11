import { Platform } from 'react-native'
import * as _ from 'lodash'
import * as FileSystem from 'expo-file-system'
import * as VideoThumbnails from 'expo-video-thumbnails'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import * as ImageManipulator from 'expo-image-manipulator'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

const BASE_DIR = `${FileSystem.cacheDirectory}expo-cache/`

async function ensureDirExists(givenDir) {
  const dirInfo = await FileSystem.getInfoAsync(givenDir)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(givenDir, { intermediates: true })
  }
}

export const downloadFile = async (file, fileName) => {
  try {
    await ensureDirExists(BASE_DIR)
    const fileUri = `${BASE_DIR}${fileName}`
    const info = await FileSystem.getInfoAsync(fileUri)
    const { exists, uri } = info

    if (exists) {
      return { uri }
    }

    const downloadResumable = FileSystem.createDownloadResumable(file, fileUri)
    return downloadResumable.downloadAsync()
  } catch (error) {
    return { uri: null }
  }
}

const compressVideo = async (sourceUri) => {
  if (Platform.OS === 'ios' || Platform.OS === 'web') {
    return new Promise(resolve => {
      console.log("no compression needed, as it's iOS or web")
      resolve(sourceUri)
    })
  }

  await ensureDirExists(BASE_DIR)
  const processedUri = `${BASE_DIR}${uuid()}.mp4`

  const ffmpeg = createFFmpeg({ log: true })
  await ffmpeg.load()

  const videoFile = await fetchFile(sourceUri)
  await ffmpeg.FS('writeFile', 'input.mp4', videoFile)

  await ffmpeg.run('-i', 'input.mp4', '-c:v', 'libx264', '-crf', '28', '-preset', 'fast', '-y', processedUri)

  const data = ffmpeg.FS('readFile', processedUri)
  const videoData = new Blob([data.buffer], { type: 'video/mp4' })
  const videoUrl = URL.createObjectURL(videoData)

  console.log('Compressed video:', videoUrl)
  return videoUrl
}

const createThumbnailFromVideo = (videoUri) => {
  let processedUri = videoUri
  if (Platform.OS === 'android' && !processedUri.includes('file:///')) {
    processedUri = `file://${processedUri}`
  }
  console.log('createThumbnailFromVideo processedUri ' + processedUri)
  return new Promise(resolve => {
    if (Platform.OS === 'web') {
      return resolve(null)
    }
    VideoThumbnails.getThumbnailAsync(processedUri)
      .then(newThumbnailSource => {
        resolve(newThumbnailSource)
      })
      .catch(error => {
        console.log(error)
        resolve(null)
      })
  })
}

const resizeImage = async ({ image }, callback) => {
  const imagePath = image?.path || image?.uri
  ImageManipulator.manipulateAsync(imagePath, [], {
    compress: 0.7,
    format: ImageManipulator.SaveFormat.JPEG,
  })
    .then(newSource => {
      if (newSource) {
        callback(newSource.uri)
      }
    })
    .catch(err => {
      callback(imagePath)
    })
}

export const processMediaFile = (file, callback) => {
  const { type, uri, path } = file
  const fileSource = uri || path

  const includesVideo = type?.includes('video')
  if (includesVideo) {
    compressVideo(fileSource).then(processedUri => {
      createThumbnailFromVideo(processedUri).then(thumbnail => {
        callback({
          thumbnail: {
            ...thumbnail,
            fileName: '46002D33-E0C1-406F-BFD2-5B9E30E7F1DB.jpg',
          },
          processedUri,
        })
      })
    })
    return
  }

  const includesImage = type?.includes('image')
  if (includesImage) {
    resizeImage({ image: file }, processedUri => {
      callback({ processedUri })
    })
    return
  }
  callback({ processedUri: fileSource })
}

export const blendVideoWithAudio = async (
  { videoStream, audioStream, videoRate },
  callback,
) => {
  await ensureDirExists(BASE_DIR)
  const processedUri = `${BASE_DIR}${uuid()}.mp4`

  const ffmpeg = createFFmpeg({ log: true })
  await ffmpeg.load()

  const videoFile = await fetchFile(videoStream)
  const audioFile = await fetchFile(audioStream)

  await ffmpeg.FS('writeFile', 'video.mp4', videoFile)
  await ffmpeg.FS('writeFile', 'audio.mp3', audioFile)

  let command = ['-i', 'video.mp4', '-i', 'audio.mp3', '-map', '0:v:0', '-map', '1:a:0', '-shortest', processedUri]

  if (videoRate) {
    command = ['-i', 'video.mp4', '-i', 'audio.mp3', '-filter:v', `setpts=PTS/${videoRate}`, '-map', '0:v:0', '-map', '1:a:0', '-shortest', processedUri]
  }

  await ffmpeg.run(...command)

  const data = ffmpeg.FS('readFile', processedUri)
  const videoData = new Blob([data.buffer], { type: 'video/mp4' })
  const videoUrl = URL.createObjectURL(videoData)

  console.log('Blended video with audio:', videoUrl)
  callback(videoUrl)
}
