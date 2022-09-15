import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Pagination from './Pagination.vue'
import { useRoute, ref } from '@nuxtjs/composition-api'
import { expect } from '@jest/globals'

let wrapper

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return { __esModule: true, ...originalModule, useRoute: jest.fn() }
})

const path = '/germany/en/test/de-test'

function createComponent(propsData = {}, { CustomStub } = {}) {
  const stubs = { NuxtLink: CustomStub || RouterLinkStub }
  wrapper = shallowMount(Pagination, { propsData, stubs })
}

describe('Link', () => {
  describe('initial state', () => {
    describe('given total pages of 1', () => {
      it('should not show any dot placeholder', () => {
        useRoute.mockImplementation(() => ref({ path, query: { page: 1 } }))

        createComponent({ totalPages: 1 })
        const dots = wrapper.find('.pagination__ellipses')
        expect(dots.exists()).toBeFalsy()
      })

      it('should disable prev button', () => {
        useRoute.mockImplementation(() => ref({ path, query: { page: 1 } }))

        createComponent({ totalPages: 1 })
        const prev = wrapper.findAll('.pagination__icon').at(0)
        expect(prev.attributes('class')).toMatch('pagination__icon--disabled')
      })

      it('should disable next button', () => {
        useRoute.mockImplementation(() => ref({ path, query: { page: 1 } }))

        createComponent({ totalPages: 1 })
        const next = wrapper.findAll('.pagination__icon').at(1)
        expect(next.attributes('class')).toMatch('pagination__icon--disabled')
      })
    })

    describe('given total pages of 6', () => {
      it('should show all pages', () => {
        createComponent({ totalPages: 6 })
        const entries = wrapper.findAll('.pagination__entry')
        expect(entries.length).toBe(6)
      })

      it('should not show any dot placeholder', () => {
        createComponent({ totalPages: 6 })
        const dots = wrapper.find('.pagination__ellipses')
        expect(dots.exists()).toBeFalsy()
      })

      it('should disable prev button when given a page query of 1', () => {
        useRoute.mockImplementation(() => ref({ path, query: { page: 1 } }))

        createComponent({ totalPages: 6 })
        const btns = wrapper.findAll('.pagination__icon')

        expect(btns.at(0).attributes('class')).toMatch(
          'pagination__icon--disabled'
        )
        expect(btns.at(1).attributes('class')).not.toMatch(
          'pagination__icon--disabled'
        )
      })

      it('should disable next button when given a page query of 6', () => {
        useRoute.mockImplementation(() => ref({ path, query: { page: 6 } }))

        createComponent({ totalPages: 6 })
        const btns = wrapper.findAll('.pagination__icon')

        expect(btns.at(0).attributes('class')).not.toMatch(
          'pagination__icon--disabled'
        )
        expect(btns.at(1).attributes('class')).toMatch(
          'pagination__icon--disabled'
        )
      })

      it('should disable no button when given a page query of 5', () => {
        useRoute.mockImplementation(() => ref({ path, query: { page: 5 } }))

        createComponent({ totalPages: 6 })
        const btns = wrapper.findAll('.pagination__icon')

        expect(btns.at(0).attributes('class')).not.toMatch(
          'pagination__icon--disabled'
        )
        expect(btns.at(1).attributes('class')).not.toMatch(
          'pagination__icon--disabled'
        )
      })
    })

    describe('given total pages of 12', () => {
      describe('given a page query of 1', () => {
        it('should disable prev button', () => {
          useRoute.mockImplementation(() => ref({ path, query: { page: 1 } }))

          createComponent({ totalPages: 12 })
          const btns = wrapper.findAll('.pagination__icon')

          expect(btns.at(0).attributes('class')).toMatch(
            'pagination__icon--disabled'
          )
          expect(btns.at(1).attributes('class')).not.toMatch(
            'pagination__icon--disabled'
          )
        })

        it('should render an empty anchor tag with current page number', () => {
          useRoute.mockImplementation(() => ref({ path, query: { page: 1 } }))

          createComponent({ totalPages: 12 })
          const cur = wrapper.findAll('.pagination__entry--current')

          expect(cur.length).toBe(1)
          expect(cur.at(0).element.tagName).toBe('A')
          expect(cur.at(0).attributes('to')).toBe(undefined)
          expect(cur.at(0).text()).toMatch('1')
        })

        it('should show dot placeholder at pos 5', () => {
          useRoute.mockImplementation(() => ref({ path, query: { page: 1 } }))

          createComponent({ totalPages: 12 })
          const li = wrapper.findAll('li')
          const dots = wrapper.findAll('.pagination__ellipses')

          expect(dots.length).toBe(1)
          expect(li.at(5).find('.pagination__ellipses')).toBeTruthy()
        })
      })

      describe('given a page query of 5', () => {
        it('should disable no button ', () => {
          useRoute.mockImplementation(() => ref({ path, query: { page: 5 } }))

          createComponent({ totalPages: 12 })
          const btns = wrapper.findAll('.pagination__icon')

          expect(btns.at(0).attributes('class')).not.toMatch(
            'pagination__icon--disabled'
          )
          expect(btns.at(1).attributes('class')).not.toMatch(
            'pagination__icon--disabled'
          )
        })

        it('should render an empty anchor tag with current page number', () => {
          useRoute.mockImplementation(() => ref({ path, query: { page: 5 } }))

          createComponent({ totalPages: 12 })
          const cur = wrapper.findAll('.pagination__entry--current')

          expect(cur.length).toBe(1)
          expect(cur.at(0).element.tagName).toBe('A')
          expect(cur.at(0).attributes('to')).toBe(undefined)
          expect(cur.at(0).text()).toMatch('5')
        })

        it('should show dot placeholder at pos 2 and 5', () => {
          useRoute.mockImplementation(() => ref({ path, query: { page: 5 } }))

          createComponent({ totalPages: 12 })
          const li = wrapper.findAll('li')
          const dots = wrapper.findAll('.pagination__ellipses')

          expect(dots.length).toBe(2)
          expect(li.at(2).find('.pagination__ellipses')).toBeTruthy()
          expect(li.at(5).find('.pagination__ellipses')).toBeTruthy()
        })
      })

      describe('given a page query of 12', () => {
        it('should disable next button', () => {
          useRoute.mockImplementation(() => ref({ path, query: { page: 12 } }))

          createComponent({ totalPages: 12 })
          const btns = wrapper.findAll('.pagination__icon')

          expect(btns.at(0).attributes('class')).not.toMatch(
            'pagination__icon--disabled'
          )
          expect(btns.at(1).attributes('class')).toMatch(
            'pagination__icon--disabled'
          )
        })

        it('should render an empty anchor tag with current page number', () => {
          useRoute.mockImplementation(() => ref({ path, query: { page: 12 } }))

          createComponent({ totalPages: 12 })
          const cur = wrapper.findAll('.pagination__entry--current')

          expect(cur.length).toBe(1)
          expect(cur.at(0).element.tagName).toBe('A')
          expect(cur.at(0).attributes('to')).toBe(undefined)
          expect(cur.at(0).text()).toMatch('12')
        })

        it('should show dot placeholder at pos 2', () => {
          useRoute.mockImplementation(() => ref({ path, query: { page: 12 } }))

          createComponent({ totalPages: 12 })
          const li = wrapper.findAll('li')
          const dots = wrapper.findAll('.pagination__ellipses')

          expect(dots.length).toBe(1)
          expect(li.at(2).find('.pagination__ellipses')).toBeTruthy()
        })
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
