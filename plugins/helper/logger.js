import getLoggerFor from '~/utils/getLoggerFor'

export default (context, inject) => {
  inject('getLoggerFor', getLoggerFor)
}
