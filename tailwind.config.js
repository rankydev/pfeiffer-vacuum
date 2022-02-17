module.exports = {
  important: false,
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
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
      'pv-black': '#000000',
    },
    fontFamily: {
      sans: ['UniversLTStd', 'Helvetica Neue'],
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    lineHeight: {
      3: '.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
    },
    gridTemplateColumns: {
      desktop: 'repeat(12, minmax(0, 1fr))',
      tablet: 'repeat(8, minmax(0, 1fr))',
      mobile: 'repeat(4, minmax(0, 1fr))',
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
  },
  prefix: 'tw-',
}
