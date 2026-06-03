export function ExtractExtension(element) {
  const indexOfImage = element.substring(lastIndexOf("/")
    + 1, element.length);
  console.log(indexOfImage)

  const extension = indexOfImage.substring(element.indexOf(".") + 1, element.length)
  return extension
}
