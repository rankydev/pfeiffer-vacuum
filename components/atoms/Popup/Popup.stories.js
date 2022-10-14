import Popup from './Popup'
import Button from '~/components/atoms/Button/Button.vue'

const argTypes = {
  position: 'bottom',
}

export default {
  title: 'Technical components/Popup',
  component: Popup,
  parameters: {
    docs: {
      description: {
        component:
          'General popup component, to show additional data to a defined activator.',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { Popup, Button },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview" style="display: flex; flex-direction: column; justify-content: center; height: 500px">
    <div style="display: flex; justify-content: space-between">
      <Popup v-bind="args">
        <template #activator="{togglePopup}">
        <Button label="Left Button" @click="togglePopup"/>
        </template>
        <template>
          <h1 style="white-space: nowrap;">Hello I'm a component in a popup</h1>
        </template>
      </Popup>

      <Popup v-bind="args">
        <template #activator="{togglePopup}">
          <Button label="Center Button" @click="togglePopup"/>
        </template>
        <template>
          <h1 style="white-space: nowrap;">Hello I'm a component in a popup</h1>
        </template>
      </Popup>

      <Popup v-bind="args">
        <template #activator="{togglePopup}">
          <Button label="Right Button" @click="togglePopup"/>
        </template>
        <template>
          <h1 style="white-space: nowrap;">Hello I'm a component in a popup</h1>
        </template>
      </Popup>
    </div>
  </div>`,
})

export const Default = Template.bind({})
