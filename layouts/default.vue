<template>
  <div>
    <a href="#main-content" class="layout-default__skip-navigation">
      skip navigation
    </a>
    <div id="main-content">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss">
@import 'defaultColors';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.layout-default {
  // TODO: need to be styled
  &__skip-navigation {
    position: absolute;
    transform: translateY(-120%);

    &:focus {
      transform: translateY(0);
    }
  }
}
</style>
