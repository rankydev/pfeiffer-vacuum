import TextArea from '~/components/atoms/FormComponents/TextArea/TextArea.vue'

export default {
  title: 'Atoms/TextArea',
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
    <TextArea v-bind="args[0]" />
    <br/>
    <TextArea v-bind="args[1]" />
    <br/>
    <TextArea v-bind="args[2]" />
    <br/>
    <TextArea v-bind="args[3]" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = [
  {
    placeholder: 'Placeholder',
    text: '',
    label: '',
    required: true,
    disabled: false,
  },
  {
    placeholder: 'Placeholder',
    text: '',
    label: '',
    required: true,
    disabled: true,
  },
  {
    placeholder: 'Placeholder',
    text: '',
    label: 'Label',
    required: false,
    disabled: false,
  },
  {
    placeholder: 'Placeholder',
    text: '',
    label: 'Label',
    required: false,
    disabled: true,
  },
]
