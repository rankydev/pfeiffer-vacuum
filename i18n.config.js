// all available locales that can be enabled
const availableLocales = [
  {
    code: 'en',
    iso: 'en-US',
    name: 'English',
    file: 'en/index.js',
  },
  {
    code: 'de',
    iso: 'de-DE',
    name: 'Deutsch',
    file: 'de/index.js',
  },
  {
    code: 'ko',
    iso: 'ko-KO',
    name: '한국인',
    file: 'ko/index.js',
  },
  {
    code: 'zh',
    iso: 'zh-CN',
    name: '简体中文',
    file: 'zh/index.js',
  },
]

export const languageCodes = (process.env.LANGUAGE_CODES || 'en').split(',')
export const defaultLanguageCode = process.env.DEFAULT_LANGUAGE_CODE || 'en'

export const locales = availableLocales.filter((local) =>
  languageCodes.includes(local.code)
)

/*
  DateTimeFormat

  Vue-i18n Doc: https://kazupon.github.io/vue-i18n/guide/datetime.html
  DateTimeFormat Doc: http://www.ecma-international.org/ecma-402/2.0/#sec-intl-datetimeformat-constructor
 */
export const dateTimeFormats = {
  de: {
    date: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    dateLong: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    },
    time: {
      hour: 'numeric',
      minute: 'numeric',
    },
    timeLong: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
    dateTime: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    },
    dateTimeLong: {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
    dateTimeTimezone: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    },
  },
  en: {
    date: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    dateLong: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    },
    time: {
      hour: 'numeric',
      minute: 'numeric',
    },
    timeLong: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
    dateTime: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    },
    dateTimeLong: {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
    dateTimeLongTimezone: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    },
  },
}
