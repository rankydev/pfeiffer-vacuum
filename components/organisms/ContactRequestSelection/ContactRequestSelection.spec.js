import { createLocalVue, shallowMount } from '@vue/test-utils'
import ContactRequestSelection from './ContactRequestSelection.vue'

import {
  mainHeadline,
  selectionHeadline,
  text,
  requestSubjects,
} from './ContactRequestSelection.stories.content.js'
import { expect, it } from '@jest/globals'

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

  wrapper = shallowMount(ContactRequestSelection, options)
}

describe('ContactRequestSelection', () => {
  describe('initial state', () => {
    it('should provide mainHeadline, selectionHeadline, text and requestSubjects when provided', () => {
      const propsData = {
        mainHeadline,
        selectionHeadline,
        text,
        requestSubjects,
      }
      createComponent(propsData)

      const mainHl = wrapper.find(
        '.contact-request-selection__content--mainHeadline'
      )
      const selectionHl = wrapper.find(
        '.contact-request-selection__content--selectionHeadline'
      )
      const selectionText = wrapper.find(
        '.contact-request-selection__content--text'
      )

      // ToDo: Needs a test for testing ContactRequestSubjects later, at the moment uses Accordion but will be replaced

      // expect(accordion.exists()).toBeTruthy()

      expect(mainHl.text()).toMatch(mainHeadline)
      expect(selectionHl.text()).toMatch(selectionHeadline)
      expect(selectionText.text()).toMatch(text)
    })
    it('bla NuxtDynamic', () => {
      const propsData = {
        mainHeadline,
        selectionHeadline,
        text,
        requestSubjects,
      }
      createComponent(propsData)

      const subjects = wrapper.findAll('[name="ContactRequestSubject"]')
      expect(subjects).toHaveLength(3)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
