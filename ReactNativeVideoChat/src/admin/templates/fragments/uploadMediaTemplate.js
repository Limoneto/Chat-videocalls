let fieldName = await startUpload(fields?.fieldName)
const promises = fields?.media?.map(async media => {
  let url = await startUpload(media)
  uploadMediaURLs.push(url)
})
