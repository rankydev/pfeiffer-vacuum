import { parameters as nuxtParameters } from '~/.nuxt-storybook/storybook/preview.js'
import '~/assets/scss/storybook.scss'

export const globalTypes = {}

export const decorators = []

export const parameters = {
  ...nuxtParameters,
  viewMode: 'story',
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Generic UI',
        'Atoms',
        'Molecules',
        'Organisms',
        'Templates'
      ]
    }
  },
  /*
   * @storybook/addon-backgrounds
   * See: https://storybook.js.org/docs/vue/essentials/backgrounds
   */
  backgrounds: {
    values: [
      {
        name: 'white',
        value: '#FFFFFF'
      },
      {
        name: 'light grey (pv-grey-96)',
        value: '#F5F5F5'
      },
      {
        name: 'mid grey (pv-grey-32)',
        value: '#515151'
      },
      {
        name: 'dark grey (pv-grey-16)',
        value: '#292929'
      },
      {
        name: 'pfeiffer red',
        value: '#DD1541'
      }
    ]
  },
  /*
   * @storybook/addon-viewport
   * See: https://storybook.js.org/docs/vue/essentials/viewport
   */
  viewport: {
    viewports: {
      SM_MIN: {
        name: 'SM Min',
        styles: {
          width: '320px',
          height: '740px'
        }
      },
      SM_MAX: {
        name: 'SM Max',
        styles: {
          width: '767px',
          height: '740px'
        }
      },
      MD_MIN: {
        name: 'MD Min',
        styles: {
          width: '768px',
          height: '960px'
        }
      },
      MD_MAX: {
        name: 'MD Max',
        styles: {
          width: '1079px',
          height: '960px'
        }
      },
      LG_MIN: {
        name: 'LG Min (Desktop)',
        styles: {
          width: '1080px',
          height: '800px'
        }
      },
      LG_MAX: {
        name: 'LG Max',
        styles: {
          width: '1439px',
          height: '1024px'
        }
      },
      XL_MIN: {
        name: 'XL MIN',
        styles: {
          width: '1440px',
          height: '1440px'
        }
      },
      XL_MAX: {
        name: 'XL MAX',
        styles: {
          width: '2560px',
          height: '1440px'
        }
      }
    }
  },
  /*
   * @storybook/addon-controls
   * https://storybook.js.org/docs/vue/essentials/controls
   */
  controls: {
    expanded: false,
    hideNoControlsWarning: true
  }
}
