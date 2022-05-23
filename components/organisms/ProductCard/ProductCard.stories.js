import GenericCard from '~/components/atoms/GenericCard/GenericCard.vue'
import {
  imageSizes,
  subheading,
  heading,
  description,
  additionalInfo,
  image,
} from './ProductCard.stories.content'

const argTypes = {
  imageSize: {
    options: imageSizes,
    control: { type: 'inline-radio' },
  },

  // slots

  image: {
    control: { type: 'text' },
    defaultValue: `<img src="${image}" />`,
    table: { type: { summary: null } },
  },

  subheading: {
    control: { type: 'text' },
    defaultValue: subheading,
    table: { type: { summary: null } },
  },

  heading: {
    control: { type: 'text' },
    defaultValue: heading,
    table: { type: { summary: null } },
  },

  description: {
    control: { type: 'text' },
    defaultValue: description,
    table: { type: { summary: null } },
  },

  additionalInfo: {
    control: { type: 'text' },
    defaultValue: additionalInfo,
    table: { type: { summary: null } },
  },

  actionItems: {
    control: { type: 'text' },
    defaultValue: 'Action items',
    table: { type: { summary: null } },
  },
}

export default {
  title: 'Organisms/ProductCard',
  component: GenericCard,
  parameters: {
    docs: {
      description: {
        component:
          'The generic card is an abstract component which can be used to define the different card components like product card or blog card.',
      },
      source: {
        code: `<GenericCard v-bind="{ imageSize }" >
            <template v-slot:image />
            <template v-slot:subheading />
            <template v-slot:heading />
            <template v-slot:description />
            <template v-slot:additionalInfo />
            <template v-slot:actionItems />
          </GenericCard>`,
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { GenericCard },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview" style="width: 300px; padding: 20px; background-color: #f5f5f5;">
    <GenericCard v-bind="args">
      <template v-if="'image' in args" v-slot:image>${args.image}</template>
      <template v-if="'subheading' in args" v-slot:subheading>${args.subheading}</template>
      <template v-if="'heading' in args" v-slot:heading>${args.heading}</template>
      <template v-if="'description' in args" v-slot:description>${args.description}</template>
      <template v-if="'additionalInfo' in args" v-slot:additionalInfo>${args.additionalInfo}</template>
      <template v-if="'actionItems' in args" v-slot:actionItems>${args.actionItems}</template>
    </GenericCard>
  </div>
`,
})

export const Default = Template.bind({})

Default.args = {
  imageSize: imageSizes[0],
}
