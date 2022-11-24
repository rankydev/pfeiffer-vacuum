export default function (to) {
  // Scroll to hash if set and on same site.
  if (to.hash !== '' && document !== null && document.querySelector(to.hash)) {
    document.querySelector(to.hash).scrollIntoView({ behavior: 'smooth' })
    return
  }
}
