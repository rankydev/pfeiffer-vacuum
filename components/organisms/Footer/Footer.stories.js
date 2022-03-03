import PvFooter from '~/components/organisms/Footer/Footer.vue'
import { footerContent, footerContent2 } from './Footer.stories.content'

// const argTypes = {
//   /**
//    *
//    */
//   socialMedia: {
//     defaultValue: {
//       channels,
//     },
//     control: { type: 'object' },
//   },
//   footerNavigationColumn: {
//     defaultValue: {
//       footerNavigationColumn,
//     },
//     control: { type: 'array' },
//   },
//   newsletter: {
//     defaultValue: {
//       newsletterContent,
//     },
//     control: { type: 'object' },
//   },
//   footerBottom: {
//     defaultValue: {
//       copyright,
//     },
//     control: { type: 'object' },
//   },
// }

export default {
  title: 'Organisms/Footer',
  component: PvFooter,
  parameters: {
    docs: {
      description: {
        component: 'All parts of the page Footer combined.',
      },
    },
  },
  // argTypes: argTypes,
}

const Template = (args) => ({
  components: { PvFooter },
  setup() {
    return {
      args,
      footerContent,
    }
  },
  template: `
  <div class="documentation-preview">
    <PvFooter v-bind="footerContent" />
  </div>
`,
})

export const Default = Template.bind({})
