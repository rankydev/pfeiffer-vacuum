import consola from 'consola'

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
 * @param file - the file the logger is used in
 * @return {object} with log functions (same as console)
 */
export function getLoggerFor(file) {
  const Logger = {}
  Object.keys(console).forEach((key) => {
    if (typeof console[key] === 'function') {
      Logger[key] = function () {
        const prefix = `[${file}]`
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
        )}]`
        const logParameters = [timestamp, prefix, ...arguments]
        console[key].apply(null, logParameters)
      }
    }
  })
  return Logger
}

export default (context, inject) => {
  inject('getLoggerFor', getLoggerFor)
}
