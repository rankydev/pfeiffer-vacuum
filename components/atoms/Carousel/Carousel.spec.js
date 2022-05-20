import { createLocalVue, shallowMount } from '@vue/test-utils'
import { carouselEntries, mockContent } from './Carousel.stories.content'
import Button from '~/components/atoms/Button/Button'
import Carousel from './Carousel'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

let wrapper

const slickSliderStub = {
  template: `
      <div>
        <slot />
        <slot name="prevArrow" />
        <slot name="nextArrow" />
      </div>
      `,
}

const nuxtDynamicStub = {
  template: '<div />',
}

function createComponent(propsData = {}) {
  const stubs = {
    Button: true,
    Template: true,
    VueSlickCarousel: slickSliderStub,
    NuxtDynamic: nuxtDynamicStub,
  }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(Carousel, options)
}

describe('Carousel', () => {
  describe('initial state', () => {
    test('should render carousel when no entries are provided', () => {
      createComponent()

      const carouselWrapper = wrapper.find('.carousel')

      expect(carouselWrapper).toBeTruthy()
    })

    test('should render carousel entries given propsData', () => {
      createComponent({ slides: carouselEntries })

      const entries = wrapper.findAllComponents(nuxtDynamicStub)

      expect(entries).toHaveLength(carouselEntries.length)
    })

    test('should render carousel in wide mode given isWide prop', () => {
      createComponent({ slides: carouselEntries, isWide: true })

      const wideSlider = wrapper.find('.carousel__slider--wide')
      const contentWrapper = wrapper.findComponent(ContentWrapper)

      expect(wideSlider.exists()).toBeTruthy()
      expect(wideSlider.attributes('slidestoshow')).toBe('6')
      expect(contentWrapper.attributes('breakout')).toBeTruthy()
      expect(contentWrapper.attributes('noPadding')).toBeFalsy()
    })

    test('should extend default settings than overwriting them given example setting', () => {
      createComponent({
        slides: carouselEntries,
        settings: { speed: 500 },
      })

      const slider = wrapper.find('.carousel__slider')

      expect(slider.attributes('speed')).toBe('500')
      expect(slider.attributes('autoplay-speed')).toBe('5000')
    })

    describe('buttons', () => {
      /*test('should render next and no prev button given enough entries', () => {
        createComponent({ slides: carouselEntries })

        const prev = wrapper.find('.slider__prev--hide')
        const next = wrapper.find('.slider__next--hide')

        expect(prev.exists()).toBeTruthy()
        expect(next.exists()).toBeFalsy()
      })*/

      test('should render both buttons given prop infinite true', () => {
        createComponent({ slides: carouselEntries, infinite: true })

        const prev = wrapper.find('.slider__prev')
        const next = wrapper.find('.slider__next')

        expect(prev.exists()).toBeTruthy()
        expect(next.exists()).toBeTruthy()
      })
    })

    describe('infinite and autoplay', () => {
      test('should set correct infinite and autoplay state given only these props', () => {
        createComponent({
          slides: carouselEntries,
          autoplay: true,
          autoplaySpeed: '4000',
          infinite: true,
        })

        const slider = wrapper.find('.carousel__slider')

        expect(slider.attributes('infinite')).toBeTruthy()
        expect(slider.attributes('autoplay')).toBeTruthy()
        expect(slider.attributes('autoplay-speed')).toBe('4000')
      })

      test('should set correct infinite state given homestage true', () => {
        createComponent({
          slides: carouselEntries,
          infinite: true,
          isHomeStage: true,
        })

        const slider = wrapper.find('.carousel__slider')

        expect(slider.attributes('infinite')).toBeTruthy()
      })

      test('should set correct infinite state given isWide true', () => {
        createComponent({
          slides: carouselEntries,
          infinite: true,
          isWide: true,
        })

        const slider = wrapper.find('.carousel__slider')

        expect(slider.attributes('infinite')).toBeFalsy()
      })
    })
  })

  /*describe('during interaction', () => {
    test('should show both buttons given an active slide unequal to first or last one', async () => {
      createComponent({ slides: carouselEntries })

      console.log(wrapper.html())

      const prev = wrapper.find('.slider__prev--hide')
      const next = wrapper.find('.slider__next--hide')

      expect(prev.exists()).toBeTruthy()
      expect(next.exists()).toBeFalsy()

      const nextBtn = wrapper.findAllComponents(Button).at(1)
      await nextBtn.trigger('click')
      await wrapper.vm.$nextTick()

      const newPrev = wrapper.find('.slider__prev--show')
      const newNext = wrapper.find('.slider__next--show')
      expect(newPrev.exists()).toBeTruthy()
      expect(newPrev.exists()).toBeTruthy()
      expect(newNext.exists()).toBeTruthy()
    })

    test('should hide next button given last slide as active', async () => {
      createComponent({
        slides: carouselEntries,
        settings: {
          initialSlide: carouselEntries.length - 1,
        },
      })

      console.log(wrapper.html())
      const next = wrapper.find('.slider__next--hide')

      expect(next.exists()).toBeTruthy()
    })
  })*/
})
