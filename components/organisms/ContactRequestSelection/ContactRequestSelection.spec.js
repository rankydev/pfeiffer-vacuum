import { createLocalVue, shallowMount } from '@vue/test-utils'
import ContactRequestSelection from './ContactRequestSelection.vue'

import {
  mainHeadline,
  sectionHeadline,
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
    it('should provide mainHeadline, sectionHeadline, text and requestSubjects when provided', () => {
      const propsData = {
        mainHeadline,
        sectionHeadline,
        text,
        requestSubjects,
      }
      createComponent(propsData)

      const mainHl = wrapper.find('.contact-request-selection__main-headline')
      const selectionHl = wrapper.find(
        '.contact-request-selection__section-headline'
      )
      const selectionText = wrapper.find('.contact-request-selection__text')

      expect(mainHl.text()).toMatch(mainHeadline)
      expect(selectionHl.text()).toMatch(sectionHeadline)
      expect(selectionText.text()).toMatch(text)
    })
    it('bla NuxtDynamic', () => {
      const propsData = {
        mainHeadline,
        sectionHeadline,
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
