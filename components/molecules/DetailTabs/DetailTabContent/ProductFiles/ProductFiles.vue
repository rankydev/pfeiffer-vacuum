<template>
  <div class="product-files">
    <div v-if="files.length">
      <h4>
        {{ $t('product.downloads') }}
      </h4>
      <div class="filters">
        Filters
        <!-- Replace with filter components -->
        <!-- <t-dropdown class="filters__dropdown">
          <div
            slot="trigger"
            slot-scope="{
              mousedownHandler,
              focusHandler,
              blurHandler,
              keydownHandler,
            }"
          >
            <t-button
              variant="trigger"
              class="active-filter"
              @mousedown="mousedownHandler"
              @focus="focusHandler"
              @blur="blurHandler"
              @keydown="keydownHandler"
            >
              {{ $t('product.file.category') }}
              <material-icon icon="arrow_drop_down" />
            </t-button>
          </div>
          <div>
            <div
              v-for="(item, index) in availableCategories"
              :key="index"
              class="filter-item"
              @click="filterChanged('category', item)"
            >
              <div class="filter-item-content">
                <pv-form-checkbox
                  class="tw-cursor-pointer"
                  :value="categoryFilter.find((o) => o === item) !== undefined"
                >
                  {{ item }}
                </pv-form-checkbox>
              </div>
            </div>
          </div>
        </t-dropdown>
        <t-dropdown class="filter-dropdown">
          <div
            slot="trigger"
            slot-scope="{
              mousedownHandler,
              focusHandler,
              blurHandler,
              keydownHandler,
            }"
          >
            <t-button
              variant="trigger"
              class="active-filter"
              @mousedown="mousedownHandler"
              @focus="focusHandler"
              @blur="blurHandler"
              @keydown="keydownHandler"
            >
              {{ $t('product.file.language') }}
              <material-icon icon="arrow_drop_down" />
            </t-button>
          </div>
          <div>
            <div
              v-for="(item, index) in availableLanguages"
              :key="index"
              class="filter-item"
              @click="filterChanged('language', item)"
            >
              <div class="filter-item-content">
                <pv-form-checkbox
                  :value="languageFilter.find((o) => o === item) !== undefined"
                >
                  {{ item }}
                </pv-form-checkbox>
              </div>
            </div>
          </div>
        </t-dropdown>
        <div
          v-if="categoryFilter.length > 0 || languageFilter.length > 0"
          class="selected-elements"
        >
          <div class="filter-category-label">
            {{ $t('documents.activeFilters') }}
          </div>
          <div class="document-filters">
            <div v-for="(item, index) in categoryFilter" :key="index">
              <div class="selected-item">
                <span
                  class="item-label"
                  v-html="`${$t('product.file.category')}: <b>${item}</b>`"
                />
                <material-icon
                  icon="close"
                  class="remove-item"
                  @click.native="filterChanged('category', item)"
                />
              </div>
            </div>
            <div v-for="(item, index) in languageFilter" :key="index">
              <div class="selected-item">
                <span
                  class="item-label"
                  v-html="`${$t('product.file.language')}: <b>${item}</b>`"
                />
                <material-icon
                  icon="close"
                  class="remove-item"
                  @click.native="filterChanged('language', item)"
                />
              </div>
            </div>
          </div>
        </div> -->
      </div>

      <GenericTable
        :header="[{ title: 'Test' }]"
        :data="[{ entries: [{ text: 'Test123', marginal: 'marginal123' }] }]"
      />

      <!-- Replace table with GenericTable -->
      <table class="tw-hidden lg:tw-block tw-table-fixed">
        <tr class="tw-bg-pv-grey-32">
          <th
            v-for="(field, index) in fields"
            :key="index"
            :class="
              'tw-cursor-pointer tw-text-left tw-whitespace-nowrap tw-px-2 tw-text-white tw-p-4 ' +
              `tw-w-${field.width}/12`
            "
          >
            {{ field.label }}
            <img
              v-if="field.sortable"
              class="tw-inline-block"
              src="~/assets/images/sort.svg"
              alt="Product File Image"
            />
          </th>
        </tr>
        <tr
          v-for="(file, index) in filteredFiles"
          :key="index"
          :class="{ 'tw-bg-pv-grey-96': index % 2 === 0 }"
        >
          <td class="tw-p-4">
            <h6 class="sub" v-html="file.title" />
            <p class="category">
              {{
                file.downloadLink.substring(
                  file.downloadLink.lastIndexOf('/') + 1
                )
              }}
            </p>
          </td>
          <td class="tw-p-4">
            <p class="sub">
              {{ file.informationType ? file.informationType.label[0] : '' }}
            </p>
          </td>
          <td class="tw-p-4">
            <h6
              v-if="
                Array.isArray(file.languages.label) &&
                file.languages.label.length > 1 &&
                file.informationType.value[0] === 'Step-File'
              "
              class="sub"
            />
            <h6 v-else-if="Array.isArray(file.languages.label)" class="sub">
              {{ file.languages.label.join(', ') }}
            </h6>
          </td>
          <td class="tw-p-4">
            <h6 class="sub tw-whitespace-nowrap">
              {{ $d(new Date(file.modificationDate.value), 'date') }}
            </h6>
          </td>
          <td>
            <h6 class="sub tw-whitespace-nowrap">
              ~ {{ formatFileSize(file.fileSize) }}
            </h6>
          </td>
          <td class="tw-p-4">
            <a
              :href="`${empolisProxyDownloadPath}/${file.downloadLink}`"
              :download="isStepFile(file) ? `${file.title}.stp` : null"
              target="_blank"
            >
              <t-button variant="secondary">
                <Icon icon="file_download" />
              </t-button>
            </a>
          </td>
        </tr>
      </table>

      <!-- Replace table with GenericTable -->
      <div class="tw-block lg:tw-hidden mobile">
        <div
          v-for="(file, index) of filteredFiles"
          :key="index"
          :class="index % 2 === 0 ? 'even tw-grid' : 'odd tw-grid'"
        >
          <div class="tw-col-span-12 md:tw-col-span-6">
            <h6 class="sub" v-html="file.title" />
            <div class="category">
              {{ file.informationType ? file.informationType.label[0] : '' }}
            </div>
          </div>
          <div class="badges tw-col-span-12 md:tw-col-span-4">
            <template
              v-if="
                Array.isArray(file.languages.label) &&
                file.languages.label.length > 1 &&
                file.informationType.value[0] === 'Step-File'
              "
            >
            </template>
            <template v-else-if="Array.isArray(file.languages.label)">
              <t-tag
                v-for="(language, indexLang) of file.languages.label"
                :key="indexLang"
              >
                {{ language }}
              </t-tag>
            </template>
            <t-tag>
              {{ $d(new Date(file.modificationDate.value), 'date') }}
            </t-tag>
            <t-tag class="badge tw-w-auto">
              ~ {{ formatFileSize(file.fileSize) }}
            </t-tag>
          </div>

          <div class="download-button">
            <a
              :href="`${empolisProxyDownloadPath}/${file.downloadLink}`"
              :download="isStepFile(file) ? `${file.title}.stp` : null"
              target="_blank"
            >
              <t-button variant="secondary" class="tw-w-full">
                <span class="tw-inline md:tw-hidden">
                  {{ $t('product.download') }}
                </span>
                <Icon icon="file_download" />
              </t-button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!files.length && !loading">
      <Icon class="downloads-icon" icon="file_download" />
      <h4 class="tw-text-center">
        {{ $t('product.noDownloads') }}
      </h4>
    </div>
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
import GenericTable from '~/components/molecules/GenericTable/GenericTable'
import { useProductStore } from '~/stores/product'
import { results } from './mock'
export default defineComponent({
  name: 'ProductFiles',
  components: {
    GenericTable,
  },
  setup() {
    const { product } = useProductStore()
    const { i18n } = useContext()
    const fields = ref([
      {
        key: 'Title',
        label: i18n.t('product.file.description'),
        sortable: true,
        width: 5,
      },
      {
        key: 'Category',
        label: i18n.t('product.file.category'),
        sortable: true,
        width: 2,
      },
      {
        key: 'Language',
        label: i18n.t('product.file.language'),
        sortable: true,
        width: 2,
      },
      {
        key: 'ModificationDate',
        label: i18n.t('product.file.date'),
        sortable: true,
        width: 1,
      },
      {
        key: 'FileSize',
        label: i18n.t('product.file.size'),
        sortable: true,
        width: 1,
      },
      {
        key: 'DownloadLink',
        label: '',
        width: 1,
      },
    ])
    const categoryFilter = ref([])
    const languageFilter = ref([])
    const loading = ref(false)
    const files = ref([])

    const availableCategories = computed(() => {
      const result = new Set()
      files.value.map((o) => {
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
      return result
    })
    const availableLanguages = computed(() => {
      const result = new Set()
      files.value.map((o) => {
        if (Array.isArray(o.languages.label)) {
          o.languages.label.forEach((language) => result.add(language))
        } else {
          result.add(o.languages.label)
        }
      })
      return result
    })
    const filteredFiles = computed(() => {
      if (
        categoryFilter.value.length === 0 &&
        languageFilter.value.length === 0
      ) {
        return files.value
      }

      const result = new Set([])

      for (const file of files.value) {
        if (
          categoryFilter.value.length > 0 &&
          file.informationType &&
          categoryFilter.value.find(
            (o) => o === file.informationType.label[0]
          ) &&
          languageFilter.value.length > 0 &&
          languageFilter.value.find(
            (o) =>
              o === file.languages.label || file.languages.label.includes(o)
          )
        ) {
          result.add(file)
        }
        if (
          languageFilter.value.length === 0 &&
          categoryFilter.value.length > 0 &&
          file.informationType &&
          categoryFilter.value.find((o) => o === file.informationType.label[0])
        ) {
          result.add(file)
        }
        if (
          categoryFilter.value.length === 0 &&
          languageFilter.value.length > 0 &&
          languageFilter.value.find(
            (o) =>
              o === file.languages.label || file.languages.label.includes(o)
          )
        ) {
          result.add(file)
        }
      }

      return Array.from(result)
    })
    const empolisProxyDownloadPath = computed(() => {
      return 'this.$env.PROXY_PATH_EMPOLIS'
    })

    const getProductDownloads = async () => {
      if (product.orderNumber) {
        loading.value = true
        console.log('### loading results')
        files.value = results
        // await this.$empolisApi.getProductDownloads(
        //   product.orderNumber
        // )
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
    const filterChanged = (type, item) => {
      switch (type) {
        case 'category':
          if (categoryFilter.value.find((o) => o === item)) {
            categoryFilter.value.splice(categoryFilter.value.indexOf(item), 1)
          } else {
            categoryFilter.value.push(item)
          }
          break
        case 'language':
          if (languageFilter.value.find((o) => o === item)) {
            languageFilter.value.splice(languageFilter.value.indexOf(item), 1)
          } else {
            languageFilter.value.push(item)
          }
          break
      }
    }
    const isStepFile = (file) => {
      return file.informationType?.value?.includes('Step-File')
    }

    return {
      fields,
      categoryFilter,
      languageFilter,
      loading,
      files,

      availableCategories,
      availableLanguages,
      filteredFiles,
      empolisProxyDownloadPath,

      getProductDownloads,
      formatFileSize,
      filterChanged,
      isStepFile,
    }
  },
})
</script>

<style lang="scss" scoped>
.product-files {
  @apply tw-px-4;
  @apply tw-py-8;

  @screen md {
    @apply tw-pl-6;
  }

  a {
    @apply tw-float-right;
  }

  h6 {
    @apply tw-text-pv-black;
  }

  p {
    &.category {
      @apply tw-text-xs;
      @apply tw-text-pv-grey-32;
    }
  }

  .header-label {
    @apply tw-text-pv-white;
  }

  .filters {
    &__dropdown {
      @apply tw-mb-4;

      ul.dropdown-menu.show {
        @apply tw-py-0;

        .filter-item {
          @apply tw-h-full;

          .filter-item-content {
            @apply tw-my-1.5;
            @apply tw-h-full;
            @apply tw-flex;
            @apply tw-items-center;

            span {
              @apply tw-h-6;
            }
          }
        }
      }
    }
  }

  .document-filters {
    @apply tw-flex;
    @apply tw-flex-wrap;

    .selected-item {
      @apply tw-relative;
      @apply tw-inline-block;
      @apply tw-mr-2;
      @apply tw-mb-2;
      @apply tw-px-2;
      @apply tw-py-1.5;
      @apply tw-border-pv-red;
      @apply tw-border-2;

      .item-label,
      .remove-item {
        @apply tw-text-pv-red;
      }

      .remove-item {
        @apply tw-cursor-pointer;
      }
    }
  }

  .mobile {
    .even,
    .odd {
      @apply tw-p-4;
    }

    .even {
      @apply tw-bg-pv-grey-96;
    }

    h6 {
      @apply tw-text-pv-black;
      @apply tw-mb-0;
    }

    .category {
      @apply tw-text-sm;
      @apply tw-text-pv-grey-48;
      @apply tw-mb-2;
    }

    .badges {
      .badge {
        @apply tw-flex;
        @apply tw-justify-center;
        @apply tw-text-xs;
        @apply tw-p-0.5;
        @apply tw-border-2;
        @apply tw-border-pv-grey-80;
        border-radius: 12px;
        max-width: 80px;
      }
    }

    .download-button {
      @apply tw-col-span-12;
      @apply tw-pt-3;

      @screen md {
        @apply tw-col-span-2;
        @apply tw-pt-0;
      }
    }

    a {
      @apply tw-w-full;
      @apply tw-mt-4;

      @screen md {
        @apply tw-mt-0;
        @apply tw-w-auto;
      }

      .material-icons {
        @apply tw-float-right;
      }
    }
  }

  .downloads-icon {
    @apply tw-block;
    @apply tw-text-center;
    @apply tw-text-5xl;
  }
}
</style>

<style lang="scss">
.files-table {
  thead {
    tr {
      @apply tw-bg-pv-grey-32;
      @apply tw-text-pv-white;
    }

    > tr > [aria-sort='none'],
    > tr > [aria-sort='descending'],
    > tr > [aria-sort='ascending'] {
      background-image: none !important;
    }
  }

  td {
    vertical-align: middle;
  }
}

.filters {
  .dropdown {
    button {
      @apply tw-border-2;
      @apply tw-border-solid;
      @apply tw-border-pv-grey-80;
      @apply tw-text-pv-grey-80;
      @apply tw-text-left;

      &[aria-expanded='true'] {
        @apply tw-border-2;
        @apply tw-border-solid;
        @apply tw-border-pv-black;
        @apply tw-text-pv-black;
        background-color: transparent;
      }
    }
  }
}
</style>
