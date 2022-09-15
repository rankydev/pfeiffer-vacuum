import Pagination from '~/components/atoms/Pagination/Pagination.vue'

export default {
  title: 'Atoms/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Pagination',
      },
    },
  },
}

const template = `
      <div class="documentation-preview">

      <Pagination base-url="#" :current-page="1" :total-pages="16" style="padding: 16px" />
      <Pagination base-url="#" :current-page="3" :total-pages="16"  style="padding: 16px" />
      <Pagination base-url="#" :current-page="5" :total-pages="16"  style="padding: 16px" />
      <Pagination base-url="#" :current-page="13" :total-pages="16"  style="padding: 16px" />
      <Pagination base-url="#" :current-page="16" :total-pages="16"  style="padding: 16px" />

      <Pagination base-url="#" :current-page="1" :total-pages="5"  style="padding: 16px" />
      <Pagination base-url="#" :current-page="2" :total-pages="5"  style="padding: 16px" />
      <Pagination base-url="#" :current-page="5" :total-pages="5"  style="padding: 16px" />
      </div>
    `

export const Default = () => ({
  components: { Pagination },
  template,
})
