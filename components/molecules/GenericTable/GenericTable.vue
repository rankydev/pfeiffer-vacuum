<template>
  <div class="dev-wrapper">
    <table class="generic-table">
      <tr class="generic-table__head">
        <th>Test</th>
        <th>Test</th>
        <th>Test</th>
        <th>Test</th>
      </tr>
      <tr class="generic-table__row">
        <td class="generic-table__cell">Lorem ipsum dolor sit amet</td>
        <td class="generic-table__cell">Lorem ipsum dolor sit amet</td>
        <td class="generic-table__cell">Lorem ipsum dolor sit amet</td>
        <td class="generic-table__cell">Lorem ipsum dolor sit amet</td>
      </tr>
    </table>
  </div>
</template>
<style lang="scss">
.dev-wrapper {
  padding: 120px 0;
  width: 100%;
}

.generic-table {
  @apply tw-w-full;
  @apply tw-text-left;
}
</style>
