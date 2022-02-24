import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

export default {
  title: 'Molecules/ContentWrapper',
  component: ContentWrapper,
  parameters: {
    docs: {
      description: {
        component:
          'The ContentWrapper can be used to display given slot content. <br> ' +
          'Currently it handles max-width only, but if needed it should handle grid breakouts/fluid via a prop too.',
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

const template = `
      <div class="documentation-preview">
        <content-wrapper>
            Lorem ipsum dolor sit amet
        </content-wrapper>
      </div>
    `

export const Default = () => ({
  components: { ContentWrapper },
  template,
})
