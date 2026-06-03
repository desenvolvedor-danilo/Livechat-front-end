export function ExtractExtension(element) {
  const indexOfImage = element.substring(element.indexOf("imagens/" + 1, element.length));

  const extension = indexOfImage.substring(element.indexOf(".") + 1, element.length)
  return extension
}
