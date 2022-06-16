import TextArea from '~/components/atoms/FormComponents/TextArea/TextArea.vue'

export default {
  title: 'Atoms/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component: 'The basic text area field',
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
    <br/>
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
