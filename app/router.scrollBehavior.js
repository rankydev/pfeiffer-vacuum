export default function (to, from) {
  if (to.hash !== '' && document !== null && document.querySelector(to.hash)) {
    // Scroll to hash if set and on same site.
    document.querySelector(to.hash).scrollIntoView({ behavior: 'smooth' })
    return
  } else {
    const pathChanged = from.path !== to.path
    const paginationChanged = from.query?.currentPage !== to.query?.currentPage

    if (pathChanged || paginationChanged) {
      return { x: 0, y: 0 }
    }
  }
}
