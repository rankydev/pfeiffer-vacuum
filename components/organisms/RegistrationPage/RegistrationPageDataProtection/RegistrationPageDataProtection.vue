<template>
  <div class="registration-page-data-protection">
    <h3>{{ $t('registration.registrationPage.conditionsTitle') }}</h3>
    <Richtext
      :richtext="$t('registration.registrationPage.conditionsDescription')"
    />
    <Link
      :href="files['privacyPersonal'] || ''"
      target="_blank"
      variant="inline"
    >
      {{ $t('registration.registrationPage.linkDataProtection') }}
    </Link>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext'
import Link from '~/components/atoms/Link/Link'
import { useDatasourcesStore } from '~/stores/datasources/datasources'

export default defineComponent({
  name: 'RegistrationPageDataProtection',
  components: { Richtext, Link },
  setup() {
    const datasourcesStore = useDatasourcesStore()
    const files = ref({})
    const getPrivacyLink = async () => {
      files.value = await datasourcesStore.loadFilesFromDatasource()
    }
    onBeforeMount(getPrivacyLink)
    return {
      files,
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
