export function ExtractExtension(element) {
  const extension = element.substring(element.indexOf(".") + 1, element.length)
  return extension
}
