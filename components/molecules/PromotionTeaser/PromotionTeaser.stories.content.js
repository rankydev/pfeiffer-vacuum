import ResponsiveImageContent from '~/components/atoms/ResponsiveImage/ResponsiveImage.stories.content.js'

export const content = [
  {
    headline: 'Vacuum Calculator',
    subline: 'Find the optimal pump for your application',
    image: [ResponsiveImageContent],
    teaserText:
      '<p>Only 6 steps away to find your vacuum pump. Our algorithm will find the right vacuum solution for you! Simply enter your target pressure and desired evacuation time, as well as the dimensions of your chamber. For desorption rate, leakage rate and piping values, we provide you with optional standard values. You can download the calculation for further use or save it in an account for later changes. Try it out!</p>',
    button: [
      {
        component: 'Button',
        disabled: false,
        href: '/en/testcv/336',
        icon: 'calculate',
        label: 'Start Vacuum Calculator',
        prependIcon: false,
        shape: 'filled',
        size: 'normal',
        target: '_self',
        variant: 'secondary',
        _uid: '23417590-b6f6-408c-90c1-33eacea9cded',
        editable: true,
      },
    ],
  },
]

export default {}
