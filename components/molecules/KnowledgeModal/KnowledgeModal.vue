<template>
  <ContentWrapper>
    <GenericModal v-bind="{ isOpen }" @close-modal="$emit('close')">
      <div class="knowledge-modal">
        <h2>Please log in</h2>
        <span class="tw-subline-3"
          >Register on our platform to access more features.</span
        >
        <div class="knowledge-modal__content">
          <div v-if="!isMobile" class="knowledge-modal__registration-form">
            <CreateAccount
              headline="Basis registration"
              description="With a basic registration you can view webinars and whitepapers and create shopping lists. After registration you can return to this page."
              :selected-country="selectedCountry"
              :selected-region="selectedRegion"
              @update="requestData.personalData = $event.registration"
            />
            <div class="knowledge-modal__actions">
              <Button
                label="Cancel"
                variant="secondary"
                shape="outlined"
                icon="close"
                @click="$emit('close')"
              />
              <Button
                label="Submit registration"
                variant="secondary"
                icon="send"
                @click="submit"
              />
            </div>
          </div>
          <div class="knowledge-modal__cta-area">
            <ContentCTABox
              v-for="(box, index) in ctaBoxContents"
              :key="index"
              v-bind="box"
              @click="box.click || null"
            />
          </div>
        </div>
      </div>
    </GenericModal>
  </ContentWrapper>
</template>
<script>
import { computed, ref, toRefs, useContext } from '@nuxtjs/composition-api'
import GenericModal from '~/components/molecules/GenericModal/GenericModal'
import CreateAccount from '~/components/molecules/CreateAccount/CreateAccount'
import ContentCTABox from '~/components/molecules/ContentCTABox/ContentCTABox'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import { getKnowledgeData } from './KnowledgeModal.data'
import { useUserStore } from '~/stores/user'
import { useVuelidate } from '@vuelidate/core'

export default {
  name: 'KnowledgeModal',
  components: { GenericModal, CreateAccount, ContentCTABox, ContentWrapper },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup() {
    const { app } = useContext()
    const userStore = useUserStore()
    const v = useVuelidate()
    const { ctaBoxContents } = toRefs(getKnowledgeData())
    const requestData = ref({ personalData: {}, companyData: {} })

    const selectedCountry = computed(() => {
      const country = requestData.value.personalData.address?.country

      if (country && Object.keys(country).length) return country

      return undefined
    })

    const selectedRegion = computed(() => {
      const region = requestData.value.personalData.address?.region

      if (region && Object.keys(region).length) return region

      return undefined
    })

    const submit = async () => {
      v.value.$validate()

      if (v.value.$errors.length + v.value.$silentErrors.length === 0) {
        await userStore.register(requestData)
      }
    }

    return {
      ctaBoxContents,
      requestData,
      selectedCountry,
      selectedRegion,
      isMobile: app.$breakpoints.isMobile,

      submit,
    }
  },
}
</script>
<style lang="scss">
.knowledge-modal {
  &__content {
    @apply tw-grid tw-grid-cols-12;
    @apply tw-gap-8;
    @apply tw-mt-12;
  }

  &__actions {
    @apply tw-flex tw-justify-between;
    @apply tw-gap-2;
    @apply tw-mt-8;
  }

  &__registration-form,
  &__cta-area {
    @apply tw-col-span-12;

    @screen md {
      @apply tw-col-span-6;
    }
  }

  &__cta-area {
    @apply tw-flex tw-flex-col;
    @apply tw-gap-8;
  }
}
</style>
