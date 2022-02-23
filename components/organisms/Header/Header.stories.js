import Header from '~/components/organisms/Header/Header.vue'

export default {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    docs: {
      description: {
        component: 'The main header of the appication',
      },
    },
  },
}

const Template = (args) => ({
  components: { Header },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Header/>
  </div>
`,
})

export const Default = Template.bind({})
