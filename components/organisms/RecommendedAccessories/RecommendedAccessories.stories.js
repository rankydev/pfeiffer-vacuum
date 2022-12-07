import RecommendedAccessories from './RecommendedAccessories.vue'
// import GenericAccordion from '~/components/atoms/GenericAccordion/GenericAccordion.vue'
// import AccessoriesCardCarousel from '~/components/organisms/AccessoriesCardCarousel/AccessoriesCardCarousel.vue'
// import { carouselEntries } from '~/components/organisms/AccessoriesCardCarousel/AccessoriesCardCarousel.stories.content'
// import { product } from '~/components/molecules/DetailTabs/DetailTabs.stories.content'

// import {
//   accordionEntries,
//   levels,
// } from '~/components/atoms/GenericAccordion/GenericAccordion.stories.content.js'

// const entrys = [
//   {
//     slotName: 'accessories-carousel',
//     disabled: false,
//     label: headline,
//   },
// ]

// const argTypes = {
//   accordionEntries: entrys,
//   level: 'paragraph',
//   entries: carouselEntries,
//   product: {
//     control: { type: 'array' },
//     defaultValue: product,
//   },
// }

export default {
  title: 'Organisms/o_xyz Recommended Accessories',
  component: RecommendedAccessories,
  parameters: {
    docs: {
      description: {
        component: RecommendedAccessories,
      },
      //       source: {
      //         code: `
      // <GenericAccordion :accordion-entries="accordionEntries">
      //   <template #item_1>
      //     <Button label="Use whatever Component you like" />
      //   </template>
      //   <template #item_2>
      //     Everything could be here
      //   </template>
      //   <template #item_3>
      //     disabled slot
      //   </template>
      // </GenericAccordion>
      // `,
      //       },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { RecommendedAccessories },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <RecommendedAccessories v-bind="args" />
  </div>
`,
})

// const Template = (args) => ({
//   components: {
//     RecommendedAccessories,
//     // GenericAccordion,
//     // AccessoriesCardCarousel,
//   },
//   setup() {
//     const productStore = useProductStore()
//     productStore.product = args.product
//     return { args }
//   },
//   template: `
//   <div>
//       <h2>Hallo Test</h2>
//     </div>
// `,
// })

export const Default = Template.bind({})
Default.args = {
  product: product,
}

{
  /* <GenericAccordion :accordion-entries="args.accordionEntries" v-bind="args">
<template #accessories-carousel>
  <!-- eslint-disable-next-line vue/valid-v-for -->
  <AccessoriesCardCarousel
    background="grey"
    :entries="args.entries"
  />
</template>
</GenericAccordion>

<reommended-accessores :headline="Wurst" /> */
}
