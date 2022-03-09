import Quicklink from '@/components/molecules/Links/Quicklink/Quicklink'

export default {
  title: 'Molecules/Links/Quicklink',
  component: Quicklink,
  parameters: {
    docs: {
      description: {
        component: 'Link that is used for quicklink navigation',
      },
      source: {
        code: '<Quicklink anchor="#testAnchor">\n  Quicklink\n</Quicklink>',
      },
    },
  },
}

const Template = (args) => ({
  components: { Quicklink },
  template: `
  <div class="documentation-preview">
    <Quicklink anchor="testAnchor">
      Quicklink
    </Quicklink>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  anchor: '#testAnchor',
}
