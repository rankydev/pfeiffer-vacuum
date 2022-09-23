import Pagination from '~/components/molecules/Pagination/Pagination.vue'
import NuxtLink from '~/.nuxt-storybook/components/nuxt-link.client.js'

Pagination.components = { ...Pagination.components, NuxtLink }

const argTypes = {
  totalPages: {
    control: { type: 'number' },
    defaultValue: 12,
  },
}

export default {
  title: 'Molecules/m_113 Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          'The Pagination can be used to paginate results. It adds a page query to the current route.',
      },
      source: {
        code: '<Pagination v-bind="{ active }" />',
      },
    },
    actions: { argTypesRegex: 'link target' },
  },
  argTypes,
}

const template = `
      <div class="documentation-preview">
        <Pagination  v-bind="args" style="padding: 16px" />
      </div>
    `

export const Default = (args) => ({
  components: { Pagination },
  setup() {
    return { args }
  },
  template,
})
