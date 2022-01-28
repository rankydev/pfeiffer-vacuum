import Logo from '~/components/atoms/Logo/Logo.vue'

export default {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    docs: {
      description: {
        component:
          'Example Story to be removed after starting with PVWEB components',
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
