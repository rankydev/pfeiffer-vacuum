import { createLocalVue, shallowMount } from '@vue/test-utils'
import ContactRequestSelection from './ContactRequestSelection.vue'
import Accordion from '~/components/atoms/Accordion/Accordion.vue'
import {
  mainHeadline,
  selectionHeadline,
  text,
  contactRequests,
} from './ContactRequestSelection.stories.content.js'
import { expect } from '@jest/globals'

const subjectAccordion = [
  {
    _uid: '35f17f46-a1c5-413e-a278-62ca514e1fd8',
    level: 'h3',
    multiple: false,
    component: 'Accordion',
    accordionEntries: contactRequests,
  },
]

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtDynamic: true }

  const options = {
    stubs,
    propsData,
  }

  wrapper = shallowMount(ContactRequestSelection, options)
}

describe('ContactRequestSelection', () => {
  describe('initial state', () => {
    it('should provide mainHeadline, selectionHeadline, text and contactRequests when provided', () => {
      const propsData = {
        mainHeadline,
        selectionHeadline,
        text,
        subjectAccordion,
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
      const accordion = wrapper.findComponent(Accordion)

      // expect(accordion.exists()).toBeTruthy()

      expect(mainHl.text()).toMatch(mainHeadline)
      expect(selectionHl.text()).toMatch(selectionHeadline)
      expect(selectionText.text()).toMatch(text)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
