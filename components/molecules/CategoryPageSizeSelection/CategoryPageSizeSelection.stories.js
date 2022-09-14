import CategoryPageSizeSelection from '~/components/molecules/CategoryPageSizeSelection/CategoryPageSizeSelection'

export default {
  title: 'Molecules/m_114 Category Page Size Selection',
  component: CategoryPageSizeSelection,
  parameters: {
    docs: {
      description: {
        component:
          'The ContentWrapper can be used to display given slot content. <br> ' +
          'It has a max-width set to 1440px. You can break out of the parent container to use full screen size with the breakout attribute.',
      },
      source: {
        code:
          '<content-wrapper>\n' +
          '  Lorem ipsum dolor sit amet \n' +
          '</content-wrapper>',
      },
    },
  },
}

const Template = (args) => ({
  components: { CategoryPageSizeSelection },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <CategoryPageSizeSelection v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { active: 9 }
