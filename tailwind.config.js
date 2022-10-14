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
      'border-red': 'inset 0 0 0 2px #dd1541',
      'border-red-lighter': 'inset 0 0 0 2px #ff184b',
      'border-grey-80': 'inset 0 0 0 2px #CCCCCC',
      'border-black': 'inset 0 0 0 2px #000000',
      'border-grey-16': 'inset 0 0 0 2px #292929',
      'border-white': 'inset 0 0 0 2px #ffffff',
      select: '0 48px 48px -48px #CCCCCC',
      'slider-handle': '0 0 0 4px rgba(0, 0, 0, 0.05)',
      'black-15': '0px 8px 32px rgba(0, 0, 0, 0.15)',
    },
    colors: {
      'pv-red': '#dd1541',
      'pv-red-darker': '#bd1237',
      'pv-red-lighter': '#ff184b',
      'pv-error-lighter': '#E24265',
      'pv-yellow': '#f2e600',
      'pv-yellow-darker': '#dacf00',
      'pv-yellow-lighter': '#f9f380',
      'pv-green': '#66cc77',
      'pv-green-lighter': '#83D490',
      'pv-warning': '#ffa64d',
      'pv-alert': '#dd1541',
      'pv-warning-lighter': '#FDB66F',
      'pv-grey-16': '#292929',
      'pv-grey-32': '#525252',
      'pv-grey-32-opacity': '#52525280',
      'pv-grey-48': '#7a7a7a',
      'pv-grey-64': '#a3a3a3',
      'pv-grey-80': '#cccccc',
      'pv-grey-88': '#e0e0e0',
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
      lg: '1.25rem', // 20px
      xl: '1.5rem', // 24px
      '2xl': '1.75rem', // 28px
      '3xl': '2rem', // 32px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '3.5rem', // 56px
    },
    lineHeight: {
      3: '0.75rem', // 12px
      4: '1rem', // 16px
      5: '1.25rem', // 20px
      6: '1.5rem', // 24px
      7: '1.75rem', // 28px
      8: '2rem', // 32px
      9: '2.25rem', // 36px
      10: '2.5rem', // 40px
      11: '2.75rem', // 44px
      14: '3.5rem', // 56px
      16: '4rem', // 64px
    },
    opacity: {
      0: '0',
      10: '0.1',
      20: '0.2',
      50: '0.5',
      80: '0.8',
      100: '1',
    },
    outlineOffset: {
      '-2': '-2px',
      '-1': '-1px',
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
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
    },
    extend: {
      gridTemplateColumns: {
        desktop: 'repeat(12, minmax(0, 1fr))',
        tablet: 'repeat(8, minmax(0, 1fr))',
        mobile: 'repeat(4, minmax(0, 1fr))',
      },
      content: {
        empty: '',
      },
    },
  },
  prefix: 'tw-',
}
