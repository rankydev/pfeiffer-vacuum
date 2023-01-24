import MyAccountNavigation from './MyAccountNavigation.vue'
import { useMyAccountStore } from '~/stores/myaccount'
import myAccountMenuItems from './MyAccountNavigation.stories.content.js'

export default {
  title: 'My Account/Navigation',
  component: MyAccountNavigation,
  parameters: {
    docs: {
      source: {
        code: '<MyAccountNavigation v-bind="{ args }" />',
      },
    },
  },
}

const Template = (args) => ({
  components: { MyAccountNavigation },
  setup() {
    const myAccountStore = useMyAccountStore()
    myAccountStore.menuItems = myAccountMenuItems
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <MyAccountNavigation v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
