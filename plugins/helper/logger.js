import Vue from 'vue'
const consola = require('consola')

let initialized = false

if (!initialized) {
  initialized = true
  consola
    .create({
      level: process.env.CONSOLA_LEVEL || 4,
    })
    .wrapConsole() // wrap regular console to consola
}

/**
 * Creates a logger as wrapper for console object to add additional log information
 * @param label - the log label
 * @return {object} with log functions (same as console)
 */
export function getLogger(label) {
  const Logger = {}
  Object.keys(console).forEach((key) => {
    if (typeof console[key] === 'function') {
      Logger[key] = function () {
        const prefix = `[${label}]` // log prefix
        const dateTimeFormatOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          fractionalSecondDigits: 3,
          hour12: false,
        }
        const timestamp = `[${new Date().toLocaleString(
          'de-de',
          dateTimeFormatOptions
        )}]` // log timestamp
        const logParameters = [timestamp, prefix, ...arguments] // log arguments
        console[key].apply(null, logParameters)
      }
    }
  })
  return Logger
}

export default (context, inject) => {
  const logger = getLogger()

  Vue.prototype.$logger = logger

  // Inject $hello(msg) in Vue, context and store.
  inject('logger', logger)
}
