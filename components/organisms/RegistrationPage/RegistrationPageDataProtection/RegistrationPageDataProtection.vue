<template>
  <div class="registration-page-data-protection">
    <h3>{{ $t('registration.registrationPage.conditionsTitle') }}</h3>
    <Richtext
      :richtext="$t('registration.registrationPage.conditionsDescription')"
    />
    <Link :href="personalPrivacyLink" target="_blank" variant="inline">
      {{ $t('registration.registrationPage.linkDataProtection') }}
    </Link>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext'
import Link from '~/components/atoms/Link/Link'
import { useDatasourcesStore } from '~/stores/datasources'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'RegistrationPageDataProtection',
  components: { Richtext, Link },
  setup() {
    const datasourcesStore = useDatasourcesStore()
    const { files } = storeToRefs(datasourcesStore)
    onBeforeMount(datasourcesStore.loadLinksFromDatasource)
    const personalPrivacyLink = computed(() => {
      return files.value['personalPrivacyLink'] || ''
    })
    return {
      personalPrivacyLink,
    }
  },
})
</script>

<style lang="scss">
.registration-page-data-protection {
  @apply tw-grid;
  @apply tw-gap-6;

  .link--inline {
    @apply tw-w-max;
  }
}
</style>
