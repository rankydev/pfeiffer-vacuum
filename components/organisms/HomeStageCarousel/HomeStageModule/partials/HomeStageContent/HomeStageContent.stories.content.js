import { homestageContentText } from '~/components/atoms/Richtext/Richtext.stories.content.js'

export default {
  headline: 'Komplettlösungen für jeden Vakuumbereich',
  component: 'HomeStageContent',
  richtext: [homestageContentText],
  buttons: [
    {
      icon: 'arrow_forward',
      size: 'normal',
      label: 'Produkte entdecken',
      shape: 'filled',
      variant: 'inverted',
      disabled: false,
      component: 'Button',
      prependIcon: false,
    },
    {
      icon: 'arrow_forward',
      size: 'normal',
      label: 'Produkte entdecken',
      shape: 'outlined',
      variant: 'inverted',
      disabled: false,
      component: 'Button',
      prependIcon: false,
    },
  ],
}
