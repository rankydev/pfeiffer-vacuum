const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  important: false,
  content: {
    layers: ['components', 'utilities'],
    content: [
      './components/**/*.{js,vue,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
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
        sans: ['UniversLTStd', 'Helvetica Neue'],
      },
      gridTemplateColumns: {
        desktop: 'repeat(12, minmax(0, 1fr))',
        tablet: 'repeat(8, minmax(0, 1fr))',
        mobile: 'repeat(4, minmax(0, 1fr))',
      },
    },
    screens: {
      sm: '0px',
      md: '768px',
      lg: '1280px',
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
  plugins: [require('@tailwindcss/forms')],
  prefix: 'tw-',
}
