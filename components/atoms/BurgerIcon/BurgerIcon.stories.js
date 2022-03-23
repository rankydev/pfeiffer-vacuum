import BurgerIcon from '~/components/atoms/BurgerIcon/BurgerIcon.vue'

export default {
  title: 'Atoms/BurgerIcon',
  component: BurgerIcon,
  parameters: {
    docs: {
      description: {
        component:
          'The burger menu icon, which toggle the mobile main menu. It can alter his from from a burger icon to a cross.',
      },
    },
  },
}

const Template = (args) => ({
  components: { BurgerIcon },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <BurgerIcon v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
