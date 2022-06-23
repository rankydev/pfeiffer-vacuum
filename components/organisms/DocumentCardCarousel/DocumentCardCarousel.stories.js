import DocumentCardCarousel from '~/components/organisms/DocumentCardCarousel/DocumentCardCarousel.vue'
import {
  headline,
  slides,
} from '~/components/organisms/DocumentCardCarousel/DocumentCardCarousel.stories.content'
import { buttonOutlinedSecondary } from '~/components/atoms/Button/Button.stories.content'

const argTypes = {
  headline: {
    control: { type: 'text' },
    defaultValue: headline,
  },
}

export default {
  title: 'Organisms/Carousels/DocumentCardCarousel',
  component: DocumentCardCarousel,
  parameters: {
    docs: {
      description: {
        component:
          'The DocumentCardCarousel component can be used to display up to 16 DocumentCards. \n' +
          'It can also have a headline and a button link.',
      },
      source: {
        code: '<DocumentCardCarousel v-bind="{ headline, button, slides }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { DocumentCardCarousel },
  setup() {
    return { args }
  },
  template: `<DocumentCardCarousel v-bind="args" />`,
})

export const Default = Template.bind({})
Default.args = {
  slides,
  button: [buttonOutlinedSecondary],
}
