import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

export default {
  title: 'Technical Components/Content Wrapper',
  component: ContentWrapper,
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
