import { homestageSlideContentText } from '~/components/atoms/Richtext/Richtext.stories.content.js'

export const homeStageSlideContentMock = {
  headline: 'Komplettlösungen für jeden Vakuumbereich',
  component: 'HomeStageSlideContent',
  richtext: [homestageSlideContentText],
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
      label: 'Anwendungen finden',
      shape: 'outlined',
      variant: 'inverted',
      disabled: false,
      component: 'Button',
      prependIcon: false,
    },
  ],
}

export const errorImageTeaserContent = {
  headline: '404 – Hier ist die Luft raus!',
  component: 'HomeStageSlideContent',
  richtext: [homestageSlideContentText],
  buttons: [
    {
      icon: 'arrow_forward',
      size: 'normal',
      label: 'Startseite',
      shape: 'filled',
      variant: 'inverted',
      component: 'Button',
    },
    {
      icon: 'arrow_forward',
      size: 'normal',
      label: 'Kontakt',
      shape: 'outlined',
      variant: 'inverted',
      component: 'Button',
    },
  ],
}

export default {}
