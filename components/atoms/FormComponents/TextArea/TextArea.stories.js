import TextArea from '~/components/atoms/FormComponents/TextArea/TextArea.vue'

export default {
  title: 'Atoms/a_104 Textarea',
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component:
          'The text area field, which offers the possibility to enter a text, set a label and specify whether the text area is required or not.',
      },
      source: {
        code: '<TextArea v-bind="{ placeholder text label required disabled }"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { TextArea },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <TextArea v-bind="args['Required']" />
    <br/>
    <TextArea v-bind="args['Required but disabled']" />
    <br/>
    <TextArea v-bind="args['With label']" />
    <br/>
    <TextArea v-bind="args['With label and disabled']" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  Required: {
    placeholder: 'Placeholder',
    required: true,
  },
  'Required but disabled': {
    placeholder: 'Placeholder',
    required: true,
    disabled: true,
  },
  'With label': {
    placeholder: 'Placeholder',
    label: 'Label',
  },
  'With label and disabled': {
    placeholder: 'Placeholder',
    label: 'Label',
    disabled: true,
  },
}
