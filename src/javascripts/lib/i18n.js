import Handlebars from 'handlebars';
import manifest from 'app_manifest';
import i18n from 'i18n';

const defaultLocale = manifest.defaultLocale || 'en';

// map to store the key/translation pairs of the loaded language
let translations;

/**
 * Replace {{placeholder}} text in the translation string with context values:
 * "search.results": "{{count}} results"
 * I18n.t('search.results', { count: 10 })
 * @param {String} str string with placeholders to be replaced
 * @param {Object} context object contains placeholder/value pairs
 * @return {String} parsed string
 */

function parsePlaceholders (str, context) {
  const regex = /{{(.*?)}}/g;
  const matches = [];
  let match;

  do {
    match = regex.exec(str);
    if (match) matches.push(match);
  } while (match);

  return matches.reduce(
    function () {
      const newRegex = new RegExp(match[0], 'g');
      const newString = str.replace(newRegex, context[match[1]]);

      return newString;
    },
    str
  );
}

const I18n = {
  /**
   * Load translations for the specified locale
   * NOTE: This is where all language files are imported (and parsed by translation-loader) during webpack bundling,
   * @param {String} locale
   * @return {Object} translation object
   */

  tryRequire (locale) {
    try {
      return require(`../../translations/${locale}.json`);
    } catch (e) {
      return null;
    }
  },

  /**
   * Translate key with currently loaded translations,
   * optional context to replace the placeholders in the translation
   * @param {String} key
   * @param {Object} context object contains placeholder/value pairs
   * @return {String} tranlated string
   */

  t (key, context) {
    try {
      const keyType = typeof key;
      if (keyType !== 'string') throw new Error(`Translation key must be a string, got: ${keyType}`);

      const template = translations[key];
      if (!template) throw new Error(`Missing translation: ${key}`);
      if (typeof template !== 'string') throw new Error(`Invalid translation for key: ${key}`);

      return parsePlaceholders(template, context);
    } catch (e) {
      return e.message;
    }
  },

  /**
   * Initialize module with specified locale info
   * @param {String} locale
   * @return {Object} translation object
   */

  loadTranslations (locale) {
    translations = I18n.tryRequire(locale) ||
      I18n.tryRequire(locale.replace(/-.+$/, '')) ||
      I18n.tryRequire(defaultLocale) ||
      {};

    return translations;
  }
};

I18n.loadTranslations(defaultLocale);

Handlebars.registerHelper('t', (key, context) => {
  try {
    return i18n.t(key, context.hash);
  } catch (e) {
    console.error(e);
    return e.message;
  }
});

export default I18n;
