<template>
  <div class="registration-page-data-protection">
    <h3>{{ $t('registration.registrationPage.conditionsTitle') }}</h3>
    <Richtext
      :richtext="$t('registration.registrationPage.conditionsDescription')"
    />
    <Link
      href="https://webportal.pfeiffer-vacuum.com/api/cms/assets/f/76453/x/8376ad0b93/data_protection_de.pdf"
      target="_blank"
      variant="inline"
    >
      {{ $t('registration.registrationPage.linkDataProtection') }}
    </Link>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext'
import Link from '~/components/atoms/Link/Link'

export default defineComponent({
  name: 'RegistrationPageDataProtection',
  components: { Richtext, Link },
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
