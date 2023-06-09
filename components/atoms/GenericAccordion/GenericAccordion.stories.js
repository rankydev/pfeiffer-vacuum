import GenericAccordion from './GenericAccordion'
import Button from '~/components/atoms/Button/Button'
import { accordionEntries, levels } from './GenericAccordion.stories.content.js'

const argTypes = {
  accordionEntries: {
    defaultValue: accordionEntries,
    control: { type: 'array' },
  },
  level: {
    options: levels,
    control: { type: 'inline-radio' },
  },
  loading: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
}

export default {
  title: 'Technical Components/ Generic Accordion',
  component: GenericAccordion,
  parameters: {
    docs: {
      description: {
        component:
          'This generic accordion allows a maximum of flexibility by providing dynamic slot support. So rendering is not limited by text elements.',
      },
      source: {
        code: `
<GenericAccordion :accordion-entries="accordionEntries">
  <template #item_1>
    <Button label="Use whatever Component you like" />
  </template>
</GenericAccordion>
`,
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { GenericAccordion, Button },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <GenericAccordion v-bind="args">
      <template #item_1>
        <Button label="Use whatever Component you like" />
      </template>
    </GenericAccordion>
  </div>
`,
})

const OverviewTemplate = (args) => ({
  components: { GenericAccordion, Button },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <GenericAccordion :accordion-entries="args.accordionEntries" v-bind="args">
      <template #item_1>
        <Button label="Use whatever Component you like" />
      </template>
      <template #item_2>
        Everything could be here
      </template>
      <template #item_3>
        disabled slot
      </template>
      <template #item_4>
        Everything could be here
      </template>
      <template #item_5>
        disabled slot
      </template>
    </GenericAccordion>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  accordionEntries: [accordionEntries[0]],
}

export const Overview = OverviewTemplate.bind({})

export const TabStyles = OverviewTemplate.bind({})
TabStyles.args = {
  useTabStyles: true,
}
