import { createLocalVue, shallowMount } from '@vue/test-utils'
import ContactFormSection from './ContactFormSection.vue'
import {
  requestForms,
  contactPersons,
} from './ContactFormSection.stories.content'

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtDynamic: true }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(ContactFormSection, options)
}

describe('ContactFormSection', () => {
  describe('initial state', () => {
    it('should provide requestForms and contactPersons when provided', () => {
      const propsData = {
        requestForms,
        contactPersons,
      }
      createComponent(propsData)

      const requestSelections = wrapper.findAll(
        '[name="ContactRequestSelection"]'
      )
      expect(requestSelections).toHaveLength(1)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
