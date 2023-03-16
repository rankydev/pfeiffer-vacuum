<template>
  <div class="product-files">
    <LoadingSpinner :show="loading">
      <div v-if="files.length && !hasError">
        <div class="product-files__filter-wrapper">
          <FilterModal :label="$t('product.file.filter')">
            <div class="product-files__filter">
              <PvSelect
                v-model="categoryFilter"
                :placeholder="$t('product.file.category')"
                :options="availableCategories"
                option-label="value"
                icon-size="small"
                multiple
                no-input
              />

              <PvSelect
                v-model="languageFilter"
                :placeholder="$t('product.file.language')"
                :options="availableLanguages"
                option-label="value"
                icon-size="small"
                multiple
                no-input
              />
            </div>
          </FilterModal>

          <div
            v-if="categoryFilter.length > 0 || languageFilter.length > 0"
            class="product-files__filter-tags"
          >
            <FilterTag
              v-for="(item, index) in categoryFilter"
              :key="`tag-category-${index}`"
              :filter="$t('product.file.category')"
              :value="item.value"
              @click="categoryFilter = categoryFilter.filter((e) => e !== item)"
            />

            <FilterTag
              v-for="(item, index) in languageFilter"
              :key="`tag-language-${index}`"
              :filter="$t('product.file.language')"
              :value="item.value"
              @click="languageFilter = languageFilter.filter((e) => e !== item)"
            />
          </div>

          <div class="product-files__result">
            {{
              $t('product.file.results', {
                count: filteredFiles.length,
                total: files.length,
              })
            }}
          </div>
        </div>

        <GenericTable :header="tableHeader" :table-data="tableData" />
      </div>
      <div v-else-if="!files.length && !loading && !hasError">
        <Icon class="product-files__downloads-icon" icon="file_download" />
        <h4 class="tw-text-center">
          {{ $t('product.noDownloads') }}
        </h4>
      </div>
      <ErrorHandling
        v-else-if="!loading"
        :headline="$t('product.errorHandling.noDownloadsAvailable')"
        :grey-background="false"
        class="product-files__error-handling"
      />
    </LoadingSpinner>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  computed,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import { useProductStore } from '~/stores/product'
import { useEmpolisStore } from '~/stores/empolis'
import { sortAsString } from '~/utils/sortHelper'
import { useEmpolisHelper } from '~/composables/useEmpolisHelper'
import FilterTag from '~/components/atoms/FilterTag/FilterTag'
import Icon from '~/components/atoms/Icon/Icon'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import FilterModal from '~/components/molecules/FilterModal/FilterModal'
import GenericTable from '~/components/molecules/GenericTable/GenericTable'
import ErrorHandling from '~/components/molecules/ErrorHandling/ErrorHandling'

export default defineComponent({
  name: 'ProductFiles',
  components: {
    Icon,
    PvSelect,
    FilterTag,
    LoadingSpinner,
    ErrorHandling,
    GenericTable,
    FilterModal,
  },
  setup() {
    const { product } = useProductStore()
    const empolisStore = useEmpolisStore()
    const { i18n } = useContext()
    const { getDownloadButtonBaseConfig } = useEmpolisHelper()

    const categoryFilter = ref([])
    const languageFilter = ref([])
    const loading = ref(false)
    const files = ref([])

    const availableCategories = computed(() => {
      const result = new Set()
      files.value.forEach((o) => {
        if (
          o.informationType?.label &&
          Array.isArray(o.informationType.label)
        ) {
          o.informationType.label.forEach((type) => result.add(type))
        } else if (
          o.informationType?.label &&
          typeof o.informationType.label === 'string'
        ) {
          result.add(o.informationType.label)
        }
      })
      return Array.from(result).map((category) => ({ value: category }))
    })
    const availableLanguages = computed(() => {
      const result = new Set()
      files.value.forEach((o) => {
        if (o.languages?.label && Array.isArray(o.languages.label)) {
          o.languages.label.forEach((language) => result.add(language))
        } else if (o.languages?.label) {
          result.add(o.languages.label)
        }
      })
      return Array.from(result).map((language) => ({ value: language }))
    })

    const filteredFiles = computed(() => {
      const hasCategoryFilter = categoryFilter.value.length
      const hasLanguageFilter = languageFilter.value.length

      if (!hasCategoryFilter && !hasLanguageFilter) return files.value

      const result = new Set([])

      for (const file of files.value) {
        const isFileOfCategory =
          hasCategoryFilter &&
          file.informationType &&
          categoryFilter.value.find(
            (o) => o.value === file.informationType.label[0]
          )

        const isFileOfLanguage =
          hasLanguageFilter &&
          languageFilter.value.find(
            (o) =>
              o.value === file.languages.label ||
              file.languages.label.includes(o.value)
          )

        if (hasCategoryFilter && hasLanguageFilter) {
          if (isFileOfCategory && isFileOfLanguage) result.add(file)
        } else {
          if (isFileOfCategory || isFileOfLanguage) result.add(file)
        }
      }

      return Array.from(result)
    })

    const hasError = ref(false)

    const getProductDownloads = async () => {
      if (product.orderNumber) {
        loading.value = true
        try {
          files.value = await empolisStore.getProductDownloads(
            product.orderNumber
          )
        } catch (e) {
          hasError.value = true
        }
        loading.value = false
      } else {
        files.value = []
      }
    }

    onBeforeMount(getProductDownloads)

    const formatFileSize = (bytes, precision = 1) => {
      if (Math.abs(bytes) < 1024) {
        return bytes + ' B'
      }

      const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      let u = -1
      const r = 10 ** precision

      do {
        bytes /= 1024
        ++u
      } while (
        Math.round(Math.abs(bytes) * r) / r >= 1024 &&
        u < units.length - 1
      )

      return bytes.toFixed(precision) + ' ' + units[u]
    }

    const tableHeader = computed(() => [
      {
        title: i18n.t('product.file.description'),
        sort: sortAsString,
      },
      {
        title: i18n.t('product.file.category'),
        sort: sortAsString,
      },
      {
        title: i18n.t('product.file.language'),
        sort: sortAsString,
      },
      {
        title: i18n.t('product.file.date'),
      },
      {
        title: i18n.t('product.file.size'),
      },
    ])

    const tableData = computed(() => {
      const result = []

      for (const file of filteredFiles.value) {
        const entries = []

        entries.push({
          text: file.title,
          marginal: file.downloadLink.substring(
            file.downloadLink.lastIndexOf('/') + 1
          ),
        })
        entries.push({
          text: file.informationType ? file.informationType.label[0] : '',
        })
        entries.push({
          text:
            Array.isArray(file.languages.label) &&
            file.informationType.value[0] !== 'Step-File'
              ? file.languages.label.join(', ')
              : '',
        })
        entries.push({
          text: i18n.d(new Date(file.modificationDate.value), 'date'),
        })
        entries.push({
          text: `~ ${formatFileSize(file.fileSize)}`,
        })

        const actionBaseData = {
          ...getDownloadButtonBaseConfig(file),
          icon: 'file_download',
          variant: 'secondary',
          shape: 'outlined',
        }

        const actions = [
          {
            ...actionBaseData,
            desktop: true,
            mobile: false,
          },
          {
            ...actionBaseData,
            desktop: false,
            mobile: true,
            label: i18n.t('product.download'),
          },
        ]

        result.push({
          entries,
          actions,
        })
      }

      return result
    })

    return {
      categoryFilter,
      languageFilter,
      loading,
      files,
      hasError,

      availableCategories,
      availableLanguages,
      filteredFiles,

      formatFileSize,

      tableHeader,
      tableData,
    }
  },
})
</script>

<style lang="scss">
.product-files {
  @apply tw-w-full;
  @apply tw-pt-6;

  @screen md {
    @apply tw-pt-8;
  }

  @screen lg {
    @apply tw-pt-12;
  }

  &__filter-wrapper {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-mb-6;
  }

  &__filter {
    @apply tw-flex;
    @apply tw-gap-2;
    @apply tw-flex-col;

    @screen md {
      @apply tw-flex-row;
    }

    & > * {
      @apply tw-min-w-full;
      @screen md {
        min-width: 250px;
      }
    }
  }

  &__filter-tags {
    @apply tw-flex;
    @apply tw-flex-wrap;
    @apply tw-gap-2;
    @apply tw-mt-6;
  }

  &__result {
    @apply tw-text-pv-grey-48;
    @apply tw-text-xs;
    @apply tw-mt-6;
  }

  &__downloads-icon {
    @apply tw-block;
    @apply tw-text-center;
    @apply tw-text-5xl;
  }

  &__error-handling {
    &.error-handling {
      @apply tw-pt-[52px];
      @apply tw-pb-[48px];
    }
  }
}
</style>
