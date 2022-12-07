<template>
  <AttributeButtons
    :values="[
      { value: false, label: 'test1' },
      { value: false, label: 'test2' },
      { value: false, label: 'test3' },
      { value: false, label: 'test4' },
    ]"
  />
</template>
<script>
import AttributeButtons from './partials/AttributeButtons'

export default {
  components: { AttributeButtons },
}
</script>
