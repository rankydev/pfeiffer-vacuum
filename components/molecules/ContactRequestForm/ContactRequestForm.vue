<template>
  <div class="contact-request-form">
    <LoadingSpinner :show="loading">
      <GeneralRequest
        v-if="contactRequestType.type === 'GENERAL_QUERY'"
        :type="contactRequestType"
        @update="requestData = $event"
      />
      <TopicRequest
        v-else
        :type="contactRequestType.type"
        @update="requestData = $event"
      />
      <div class="contact-request-form__link">
        <Link :href="personalPrivacyLink" target="_blank" variant="inline">
          {{ $t('form.contactRequest.dataPrivacy') }}
        </Link>
      </div>
      <Button
        :label="$t('form.contactRequest.submit')"
        variant="secondary"
        shape="filled"
        size="normal"
        icon="send"
        class="contact-request-form__button"
        @click.native="submit()"
      />
    </LoadingSpinner>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'
import TopicRequest from '~/components/molecules/ContactRequestForm/partials/TopicRequest/TopicRequest'
import Button from '~/components/atoms/Button/Button.vue'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import useVuelidate from '@vuelidate/core'
import { useToast } from '~/composables/useToast'
import { useContactStore } from '~/stores/contact'
import { useDatasourcesStore } from '~/stores/datasources'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    LoadingSpinner,
    GeneralRequest,
    TopicRequest,
    Button,
  },
  props: {
    /**
     * Defines which input fields are included in the form. Object is passed from Storyblok and contains a field 'type' that will be used for our components.
     */
    contactRequestType: {
      type: Object,
      required: true,
    },
  },
  emits: ['close'],
  setup(_, { emit }) {
    const loading = ref(false)
    const { i18n } = useContext()
    const contactStore = useContactStore()
    const datasourcesStore = useDatasourcesStore()
    const { files } = storeToRefs(datasourcesStore)
    const toast = useToast()
    // this will collect all nested component’s validation results
    const v = useVuelidate()
    const requestData = ref({})
    const personalPrivacyLink = computed(() => {
      return files.value['personalPrivacyLink'] || ''
    })
    onBeforeMount(datasourcesStore.loadLinksFromDatasource)

    const submit = async () => {
      v.value.$validate()
      if (v.value.$errors.length + v.value.$silentErrors.length === 0) {
        loading.value = true
        await contactStore
          .submitContact(requestData.value)
          .then(() => {
            loading.value = false
            emit('close')
            toast.success(
              {
                description: i18n.t('form.message.success'),
              },
              {
                timeout: 8000,
              }
            )
          })
          .catch(() => {
            loading.value = false
            toast.error({
              description: i18n.t('form.message.error'),
            })
          })
      }
    }

    return { v, submit, requestData, loading, personalPrivacyLink }
  },
})
</script>

<style lang="scss">
.contact-request-form {
  &__button {
    @apply tw-mt-6;
  }

  &__link {
    @apply tw-mt-6;
  }
}
</style>
