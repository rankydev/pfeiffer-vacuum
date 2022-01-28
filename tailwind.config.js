const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  important: false,
  content: {
    layers: ['components', 'utilities'],
    content: [
      './layouts/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
  },
  theme: {
    extend: {
      colors: {
        'pv-red': '#dd1541',
        'pv-red-darker': '#c01238',
        'pv-red-lighter': '#e13258',
        'pv-yellow': '#f2e600',
        'pv-yellow-darker': '#e6d200',
        'pv-yellow-lighter': '#f9f300',
        'pv-green': '#66cc77',
        'pv-warning': '#ffa64d',
        'pv-grey-16': '#292929',
        'pv-grey-32': '#515151',
        'pv-grey-48': '#7a7a7a',
        'pv-grey-64': '#a3a3a3',
        'pv-grey-80': '#cccccc',
        'pv-grey-96': '#f5f5f5',
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
      },
      fontFamily: {
        ...fontFamily,
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      gridTemplateColumns: {
        desktop: 'repeat(12, minmax(0, 1fr))',
        tablet: 'repeat(12, minmax(0, 1fr))',
        mobile: 'repeat(6, minmax(0, 1fr))',
      },
    },
    screens: {
      xs: '0px',
      sm: '480px',
      md: '720px',
      lg: '992px',
      xl: '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
      },
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1280px',
      },
    },
    fontFamily: {
      sans: ['UniversLTStd', 'Helvetica Neue'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.stretch-to-viewport': {
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          width: '100vw',
        },
        '.stretch-to-viewport-reset': {
          position: 'initial',
          left: 'initial',
          right: 'initial',
          marginLeft: 'initial',
          marginRight: 'initial',
          width: 'initial',
        },
      }

      addUtilities(newUtilities, { variants: ['responsive'] })
    }),
  ],
  prefix: 'tw-',
}
