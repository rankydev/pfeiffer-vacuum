import AnchorWrapper from '~/components/molecules/AnchorWrapper/AnchorWrapper'

const argTypes = {
  id: {
    defaultValue: 'testAnchor',
    control: { type: 'array' },
  },
  content: {},
}

export default {
  title: 'Molecules/AnchorWrapper',
  component: AnchorWrapper,
  parameters: {
    docs: {
      description: {
        component:
          'The AnchorWrapper can be used to wrap content to define an identifier for the contained components.\n' +
          'When a AnchorWrapper is defined it is possible to navigate there via a anchor link (e.g. from the quicklink navigation).',
      },
      source: {
        code: '<anchor-wrapper id="testId" content="[ components, here ]" />',
      },
    },
  },
  argTypes,
}

const template = `
      <div class="documentation-preview">
        <anchor-wrapper id="test" />
      </div>
    `

export const Default = () => ({
  components: { AnchorWrapper },
  template,
})
