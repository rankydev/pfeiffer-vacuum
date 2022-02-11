import FluidContainer from '@/components/molecules/FluidContainer/FluidContainer'
import fluidContainer from '@/components/molecules/FluidContainer/FluidContainer.stories.content'

const props = {
  items: fluidContainer.content.items,
}

export default {
  title: 'Molecules/FluidContainer',
  component: FluidContainer,
  parameters: {
    docs: {
      description: {
        component:
          'The FluidContainer is a component, which reaches over the full width of the page, up to 2560px.',
      },
    },
  },
}

const template = `
      <div class="documentation-preview">
        <FluidContainer v-bind="props" />
      </div>
    `

export const Default = () => ({
  components: { FluidContainer },
  template,
  data: () => ({ props }),
})
