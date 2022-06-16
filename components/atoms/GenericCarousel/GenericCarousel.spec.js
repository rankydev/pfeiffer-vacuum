import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Button from '~/components/atoms/Button/Button'
import GenericCarousel from './GenericCarousel'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import { ref } from '@nuxtjs/composition-api'

let wrapper
const slideMock = { template: '<div>Slide</div>' }

const slides = [
  slideMock,
  slideMock,
  slideMock,
  slideMock,
  slideMock,
  slideMock,
  slideMock,
]

const slickSliderStub = {
  template: `
      <div>
        <slot />
        <slot name="prevArrow" v-bind="{ currentSlide: current }" />
        <slot name="nextArrow" v-bind="{ currentSlide: current, slideCount: ${slides.length} }" />
      </div>
      `,
  data() {
    return { current: 0 }
  },
  methods: {
    increase: function () {
      this.current++
    },
  },
}

const nuxtDynamicStub = {
  template: '<div />',
}

function createComponent(
  propsData = {},
  { shallow = true, noStub = false, isDesktop = false, children = [] } = {}
) {
  const $breakpoints = { isDesktop: ref(isDesktop || false) }
  const mocks = { $nuxt: { context: { app: { $breakpoints } } } }

  const stubs = {
    Button: !noStub,
    VueSlickCarousel: noStub ? false : slickSliderStub,
    Template: true,
    NuxtDynamic: nuxtDynamicStub,
  }

  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
    mocks,
    slots: { slides: children },
  }

  wrapper = shallow
    ? shallowMount(GenericCarousel, options)
    : mount(GenericCarousel, options)
}

describe('GenericCarousel', () => {
  describe('initial state', () => {
    test('should render carousel when no entries are provided', () => {
      createComponent()

      const carouselWrapper = wrapper.find('.carousel')

      expect(carouselWrapper).toBeTruthy()
    })

    test('should render carousel in wide mode given isWide prop', () => {
      createComponent({ isWide: true })

      const wideSlider = wrapper.find('.carousel__slider--wide')
      const contentWrapper = wrapper.findComponent(ContentWrapper)

      expect(wideSlider.exists()).toBeTruthy()
      expect(wideSlider.attributes('slidestoshow')).toBe('6')
      expect(contentWrapper.attributes('breakout')).toBeTruthy()
      expect(contentWrapper.attributes('noPadding')).toBeFalsy()
    })

    describe('buttons', () => {
      test('should render next and no prev button given enough entries', async () => {
        createComponent({}, { shallow: false, noStub: true, children: slides })

        const prev = wrapper.find('.carousel__arrow-prev')
        const next = wrapper.find('.carousel__arrow-next')

        expect(prev.attributes('class')).toContain('carousel__arrow-prev--hide')
        expect(next.attributes('class')).not.toContain(
          'carousel__arrow-next--hide'
        )
      })

      test('should render both buttons given prop infinite true', () => {
        createComponent(
          { infinite: true },
          { shallow: false, noStub: true, children: slides }
        )

        const prev = wrapper.find('.carousel__arrow-prev')
        const next = wrapper.find('.carousel__arrow-next')

        expect(prev.exists()).toBeTruthy()
        expect(next.exists()).toBeTruthy()
      })
    })

    describe('infinite and autoplay', () => {
      test('should set correct infinite and autoplay state given only these props', () => {
        createComponent({ autoplay: true, autoplaySpeed: '4', infinite: true })

        const slider = wrapper.find('.carousel__slider')

        expect(slider.attributes('infinite')).toBeTruthy()
        expect(slider.attributes('autoplay')).toBeTruthy()
        expect(slider.attributes('autoplay-speed')).toBe('4000')
      })

      test('should set correct infinite state given infinite true', () => {
        createComponent({
          infinite: true,
        })

        const slider = wrapper.find('.carousel__slider')

        expect(slider.attributes('infinite')).toBeTruthy()
      })
    })
  })

  describe('during interaction', () => {
    test('should show both buttons given an active slide unequal to first or last one', async () => {
      createComponent({}, { shallow: false, noStub: true, children: slides })

      // TODO: mock the resizeObserver and trigger him manually to determine the visibleSlides
      const prev = wrapper.find('.carousel__arrow-prev')
      const next = wrapper.find('.carousel__arrow-next')

      await next.trigger('click')
      await wrapper.vm.$nextTick()

      expect(prev.attributes('class')).not.toContain(
        'carousel__arrow-prev--hide'
      )
      expect(next.attributes('class')).not.toContain(
        'carousel__arrow-next--hide'
      )

      const nextBtn = wrapper.findAllComponents(Button).at(1)
      await nextBtn.trigger('click')
      await wrapper.vm.$nextTick()

      const newPrev = wrapper.find('.carousel__arrow-prev--hide')
      const newNext = wrapper.find('.carousel__arrow-next--hide')
      expect(newPrev.exists()).toBeFalsy()
      expect(newNext.exists()).toBeFalsy()
    })

    test('should hide prev and next button given only one slide', async () => {
      createComponent(
        {},
        { shallow: false, noStub: true, children: [slideMock] }
      )

      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()

      const prev = wrapper.find('.carousel__arrow-prev')
      const next = wrapper.find('.carousel__arrow-next')

      expect(prev.exists()).toBeFalsy()
      expect(next.exists()).toBeFalsy()
    })
  })
})
