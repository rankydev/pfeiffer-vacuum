export default function (_, inject) {
  window.dataLayer = window.dataLayer || []
  inject('datalayer', window.dataLayer)
}
