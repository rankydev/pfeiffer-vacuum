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
    boxShadow: {
      none: '0 0 #0000',
      button: '0 12px 12px -12px rgba(51, 48, 0, 0.4)',
      'button-inverted': '0 12px 12px -12px rgba(255, 255, 255, 0.3)',
    },
    colors: {
      'pv-red': '#dd1541',
      'pv-red-darker': '#c01238',
      'pv-red-lighter': '#ff184b',
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
      'pv-white': '#ffffff',
      'pv-transparent': 'transparent',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    fontSize: {
      xs: '.75rem', // 12px
      sm: '.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48 px
      '6xl': '4rem', // 64 px
      '7xl': '5rem', // 80 px
    },
    lineHeight: {
      3: '.75rem', // 12px
      4: '1rem', // 16px
      5: '1.25rem', // 20px
      6: '1.5rem', // 24px
      7: '1.75rem', // 28px
      8: '2rem', // 32px
      9: '2.25rem', // 36px
      10: '2.5rem', // 40px
    },
    opacity: {
      0: '0',
      10: '0.1',
      20: '0.2',
      50: '0.5',
      100: '1',
    },
    outlineOffset: {
      '-2': '-2px',
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
        xl: '1440px',
      },
    },
  },
  prefix: 'tw-',
}
