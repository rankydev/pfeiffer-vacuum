import Logo from '~/components/atoms/Logo/Logo.vue'

export default {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    docs: {
      description: {
        component: 'Simple wrapper for text with html markup',
      },
    },
  },
}

const template = `
      <div class="documentation-preview">
        <Logo />
      </div>
    `

export const Default = () => ({
  components: { Logo },
  template,
})
