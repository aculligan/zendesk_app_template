function translationFlatten (object, flattened = {}, currentKeys = []) {
  Object.keys(object).map((key) => {
    const value = object[key]
    const keyArr = [...currentKeys, key]

    if (typeof value === 'object') {
      if (value.title && value.value) {
        flattened[keyArr.join('.')] = value.value
      } else {
        translationFlatten(value, flattened, keyArr)
      }
    } else {
      flattened[keyArr.join('.')] = value
    }
  })
  return flattened
}

// It compiles the Handlebars templates for the translation file to be used within the app's i18n shim
function TranslationsLoader (content) {
  this.cacheable && this.cacheable()
  const translationsInput = JSON.parse(content)
  const compiledTranslations = translationFlatten(translationsInput)
  return `module.exports = ${JSON.stringify(compiledTranslations)}`
}

module.exports = TranslationsLoader
