import { create } from '@storybook/theming/create'

// See: https://storybook.js.org/docs/react/configure/theming
export default create({
  base: 'light',
  brandTitle: 'Pfeiffer Vacuum Styleguide',
  brandUrl: 'https://www.pfeiffer-vacuum.com/',
  brandImage: 'pv-logo.svg',
  colorSecondary: '#c03',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: 'black',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4
})
