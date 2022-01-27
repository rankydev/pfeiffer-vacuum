import '~~/.nuxt-storybook/storybook/preview.js'
import '~~/assets/scss/storybook.scss'

export const parameters = {
  viewMode: 'story',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Generic UI', 'Atoms', 'Molecules', 'Organisms', 'Templates']
    }
  },
  /*
   * @storybook/addon-backgrounds
   * See: https://storybook.js.org/docs/vue/essentials/backgrounds
   */
  backgrounds: {
    values: [
      {
        name: 'pfeiffer red',
        value: '#c03'
      },
      {
        name: 'pfeiffer darkblue',
        value: '#c03'
      },
      {
        name: 'dark',
        value: '#333333'
      }
    ]
  },
  /*
   * @storybook/addon-viewport
   * See: https://storybook.js.org/docs/vue/essentials/viewport
   */
  viewport: {
    viewports: {
      S_MIN: {
        name: 'S Min (Samsung Galaxy S9)',
        styles: {
          width: '360px',
          height: '740px'
        }
      },
      S_MAX: {
        name: 'S Max',
        styles: {
          width: '599px',
          height: '740px'
        }
      },
      M_MIN: {
        name: 'M Min (Nexus 7)',
        styles: {
          width: '601px',
          height: '960px'
        }
      },
      M_MAX: {
        name: 'M Max',
        styles: {
          width: '1023px',
          height: '960px'
        }
      },
      L_MIN: {
        name: 'L Min (Desktop)',
        styles: {
          width: '1025px',
          height: '800px'
        }
      },
      L_MAX: {
        name: 'L Max',
        styles: {
          width: '1439px',
          height: '1024px'
        }
      },
      WIDE: {
        name: 'Wide (16:9)',
        styles: {
          width: '1920px',
          height: '1080px'
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
