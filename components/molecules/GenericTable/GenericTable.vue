<template>
  <div class="generic-table">
    <div v-if="isMobile" class="generic-table__card-wrapper">
      <TableCard v-for="(row, i) in data" :key="`row${i}`" :data="row" />
    </div>
    <template v-else>
      <TableView
        v-bind="{ header, data }"
        @sorting="$emit('sortingChanged', $event)"
      />
    </template>
  </div>
</template>
<script>
import { useContext } from '@nuxtjs/composition-api'
import TableView from './partials/TableView'
import TableCard from './partials/TableCard'

export default {
  components: { TableView, TableCard },
  props: {
    header: {
      type: Array,
      default: () => [
        {
          title: 'Description',
        },
        {
          title: 'Category',
        },
        {
          title: 'Language',
        },
        {
          title: 'Date',
          sortable: false,
        },
        {
          title: 'Size',
          sortable: false,
        },
      ],
    },
    data: {
      type: Array,
      default: () => [
        {
          entries: [
            {
              text: 'HiPace 300 mit TC 400',
              marginal: '12087-PT0200BDE_M.pdf',
            },
            'Allgemeine Bedienungsanleitung',
            {
              text: 'Deutsch',
              marginal: '(de)',
            },
            '17.01.2022',
            '~ 9.8 MB',
            '17.01.2022',
            '~ 9.8 MB',
            '17.01.2022',
          ],
          actions: [
            {
              icon: 'download',
              variant: 'secondary',
              shape: 'outlined',
              href: '/download',
            },
            {
              icon: 'arrow_forward',
              variant: 'secondary',
              shape: 'outlined',
              href: '/download',
              label: 'Visit',
              desktop: false,
            },
          ],
        },
        {
          entries: [
            {
              text: 'HiPace 300 mit TC 400',
              marginal: '12087-PT0200BDE_M.pdf',
            },
            'Allgemeine Bedienungsanleitung',
            'Deutsch',
            '17.01.2022',
            '~ 9.8 MB',
          ],
          actions: [
            {
              icon: 'download',
              variant: 'secondary',
              shape: 'outlined',
              href: '/test',
            },
            {
              icon: 'arrow_forward',
              variant: 'secondary',
              shape: 'outlined',
              href: '/download',
              label: 'Visit',
              desktop: false,
            },
          ],
        },
        {
          entries: [
            {
              text: 'HiPace 300 mit TC 400',
              marginal: '12087-PT0200BDE_M.pdf',
            },
            'Allgemeine Bedienungsanleitung',
            {
              text: 'Deutsch',
              marginal: '(de)',
            },
            '17.01.2022',
            '~ 9.8 MB',
          ],
          actions: [
            {
              icon: 'download',
              variant: 'secondary',
              shape: 'outlined',
              href: '/test',
            },
            {
              icon: 'arrow_forward',
              variant: 'secondary',
              shape: 'outlined',
              href: '/download',
              label: 'Visit',
              desktop: false,
            },
          ],
        },
        {
          entries: [
            {
              text: 'HiPace 300 mit TC 400',
              marginal: '12087-PT0200BDE_M.pdf',
            },
            {
              text: 'Allgemeine Bedienungsanleitung',
              marginal: 'In verschiedenen Sprachen verfügbar',
            },
            'Deutsch',
            '17.01.2022',
            '~ 9.8 MB',
          ],
          actions: [
            {
              icon: 'download',
              variant: 'secondary',
              shape: 'outlined',
              href: '/test',
            },
            {
              icon: 'arrow_forward',
              variant: 'secondary',
              shape: 'outlined',
              href: '/download',
              label: 'Visit',
              desktop: false,
            },
          ],
        },
        {
          entries: [
            'HiPace 300 mit TC 400',
            'Allgemeine Bedienungsanleitung',
            'Deutsch',
            '17.01.2022',
            '~ 9.8 MB',
          ],
          actions: [
            {
              icon: 'download',
              variant: 'secondary',
              shape: 'outlined',
              href: '/test',
            },
            {
              icon: 'arrow_forward',
              variant: 'secondary',
              shape: 'outlined',
              href: '/download',
              label: 'Visit',
              desktop: false,
            },
          ],
        },
        {
          entries: [
            'HiPace 300 mit TC 400',
            'Allgemeine Bedienungsanleitung',
            'Deutsch',
            '17.01.2022',
            '~ 9.8 MB',
          ],
          actions: [
            {
              icon: 'download',
              variant: 'secondary',
              shape: 'outlined',
              href: '/test',
            },
            {
              icon: 'arrow_forward',
              variant: 'secondary',
              shape: 'outlined',
              href: '/download',
              label: 'Visit',
              desktop: false,
            },
          ],
        },
      ],
    },
  },
  emits: ['sortingChanged'],
  setup() {
    const { app } = useContext()
    const { isMobile } = app.$breakpoints

    return { isMobile }
  },
}
</script>
<style lang="scss">
.generic-table {
  padding: 120px 0;
  width: 100%;

  &__card-wrapper {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-gap-y-6;
  }
}
</style>
