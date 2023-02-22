export default function (to) {
  // Scroll to hash if set and on same site.
  if (to.hash !== '' && document !== null && document.querySelector(to.hash)) {
    document.querySelector(to.hash).scrollIntoView({ behavior: 'smooth' })
    return
  } else {
    // TODO: This let's us scroll to the top on every page, check if this is always intended
    return { x: 0, y: 0 }
  }
}
