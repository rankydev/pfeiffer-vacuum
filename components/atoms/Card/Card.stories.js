import Card from './Card'
import Richtext from './../Richtext/Richtext'
import {
  productCardCategory,
  productCardTitle,
  productCardDescription,
  productCardAdditionalInformation,
} from './Card.stories.content'

const argTypes = {
  to: {
    control: { type: 'string' },
    defaultValue: '#',
  },
}

export default {
  title: 'Technical components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Generic carousel component used for various carousel modules',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { Card, Richtext },
  setup() {
    return {
      args,
      productCardCategory,
      productCardTitle,
      productCardDescription,
      productCardAdditionalInformation,
    }
  },
  template: `
    <div class="documentation-preview">
    <Card v-bind="args" to="#">
      <template #image=""></template>
      <template #category>
        <Richtext :richtext="productCardCategory.content.richtext"/>
      </template>
      <template #title>
        <Richtext :richtext="productCardTitle.content.richtext"/>
      </template>
      <template #description>
        <Richtext :richtext="productCardDescription.content.richtext"/>
      </template>
      <template #additionalInformation>
        <Richtext :richtext="productCardAdditionalInformation.content.richtext"/>
      </template>
    </Card>
    </div>`,
})

export const Default = Template.bind({})
Default.args = {}
