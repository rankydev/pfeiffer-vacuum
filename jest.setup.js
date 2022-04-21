import failOnConsole from 'jest-fail-on-console'

failOnConsole()

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }
