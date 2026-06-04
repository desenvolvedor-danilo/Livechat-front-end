export function ExtractExtension(element) {
  const indexOfImage = element.substring(element.lastIndexOf("/")
    + 1, element.length);
  console.log(indexOfImage)

  const extension = indexOfImage.substring(indexOfImage.indexOf(".") + 1, indexOfImage.length)
  return extension
}
