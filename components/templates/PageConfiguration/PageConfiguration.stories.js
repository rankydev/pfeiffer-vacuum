export default { title: 'Templates/PageConfiguration' }

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<PageConfiguration :content="content" />',
})

export const WithHeaderAndFooter = Template.bind({})
WithHeaderAndFooter.args = {
  content: {
    header: [{ component: 'Header' }],
    footer: [{ component: 'Footer' }],
    canonical: '',
  },
}
