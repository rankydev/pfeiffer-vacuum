<template>
  <InputField
    icon="search"
    placeholder="Suche ..."
    @submit="() => alert('Enter hit')"
    @click:icon="() => alert('Icon clicked')"
  />
</template>

<script setup>
import InputField from '~/components/atoms/Input/Input.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
</script>
