<template>
  <div class="accessories-card-carousel">
    <ContentWrapper v-if="headline" no-padding>
      <h2 class="accessories-card-carousel__headline">{{ headline }}</h2>
    </ContentWrapper>
    <GenericCarousel
      :is-wide="false"
      variant="accessoriesCardCarousel"
      class="accessories-card-carousel__content"
    >
      <template #slides>
        <div
          v-for="entry in entries"
          :key="entry.id"
          class="accessories-card-carousel__card"
        >
          <h3
            class="accessories-card-carousel__card-headline"
            :title="entry.type ? entry.type.name : ''"
          >
            {{ entry.type ? entry.type.name : '' }}
          </h3>
          <AccessoriesCard
            :product="entry.target"
            @iconClick="handleIconClick"
          />
        </div>
      </template>
    </GenericCarousel>
    <InformationModal
      :is-open="infoModalVisible"
      :headline="informationModalHeadline"
      :text="informationModalText"
      @closeModal="toggleModal"
    />
  </div>
</template>

<script>
import GenericCarousel from '~/components/atoms/GenericCarousel/GenericCarousel'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import AccessoriesCard from '~/components/molecules/AccessoriesCard/AccessoriesCard'

export default defineComponent({
  name: 'AccessoriesCardCarousel',
  components: { GenericCarousel, ContentWrapper, AccessoriesCard },
  props: {
    /**
     * Headline of the carousel
     */
    headline: {
      type: String,
      default: '',
    },
    /**
     * Slider items
     */
    entries: {
      required: true,
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const { i18n } = useContext()
    const infoModalVisible = ref(false)
    const hasCustomerPrice = ref(false)
    const toggleModal = () => (infoModalVisible.value = !infoModalVisible.value)

    const informationModalHeadline = computed(() => {
      if (hasCustomerPrice.value)
        return i18n.t('product.priceInfo.InfoPersonal')

      if (!hasCustomerPrice.value) return i18n.t('product.priceInfo.InfoOnline')
    })

    const informationModalText = computed(() => {
      if (hasCustomerPrice.value)
        return i18n.t('product.priceInfo.textInfoPersonal')

      if (!hasCustomerPrice.value)
        return `${i18n.t(
          'product.priceInfo.textInfoOnlineLine1'
        )}<br/><br/>${i18n.t('product.priceInfo.textInfoOnlineLine2')}`
    })

    const handleIconClick = (e) => {
      hasCustomerPrice.value = e
      toggleModal()
    }

    return {
      infoModalVisible,
      toggleModal,
      informationModalText,
      informationModalHeadline,
      handleIconClick,
    }
  },
})
</script>
<style lang="scss">
.accessories-card-carousel {
  &__headline {
    @apply tw-mb-4;
    @apply tw-px-5;
  }

  &__content {
    @apply tw-px-5;
  }

  &__card {
    @apply tw-pb-10;
  }

  &__card-headline {
    @apply tw-text-lg;
    @apply tw-mb-3;
    @apply tw-h-9;
    @apply tw-overflow-hidden;
    @apply tw-text-ellipsis;
    @apply tw-whitespace-nowrap;
  }
}
</style>
