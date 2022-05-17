import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import { carouselEntries } from './Carousel.stories.content'
import Button from '~/components/atoms/Button/Button'
import Carousel from './Carousel'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

let wrapper

const headline = 'Lorem headline'
const buttonText = 'Lorem button'
const propContent = {
  headline,
  button: [
    {
      _uid: 'be5655d7-d497-4702-a6cc-c6c546df90f5',
      icon: 'arrow_forward',
      size: 'normal',
      label: buttonText,
      shape: 'plain',
      variant: 'secondary',
      disabled: false,
      component: 'Button',
      prependIcon: false,
      _editable:
        '<!--#storyblok#{"name": "Button", "space": "153186", "uid": "be5655d7-d497-4702-a6cc-c6c546df90f5", "id": "122271355"}-->',
    },
  ],
}

function createComponent(propsData = {}, shallow = true) {
  const stubs = { Button: true, NuxtDynamic: true, Template: true }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallow ? shallowMount(Carousel, options) : mount(Carousel, options)
}

describe('Carousel', () => {
  describe('initial state', () => {
    test('should render carousel when no entries are provided', () => {
      createComponent()

      const carouselWrapper = wrapper.find('.carousel')

      expect(carouselWrapper).toBeTruthy()
    })

    test('should render carousel entries given propsData', () => {
      createComponent({ slides: carouselEntries }, false)

      const entries = wrapper.findAll('.slick-slide')

      expect(entries).toHaveLength(7)
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
      expect(slider.attributes('autoplayspeed')).toBe('5000')
    })

    test('should render headline and interaction button given propsData', () => {
      createComponent({
        slides: carouselEntries,
        ...propContent,
      })

      const content = wrapper.find('.carousel__content')
      const contentHeadline = content.find('h2')
      const contentButton = content.find('[component="Button"]')

      expect(contentHeadline.text()).toEqual(headline)
      expect(contentButton.attributes('label')).toEqual(buttonText)
    })

    describe('buttons', () => {
      test('should render no buttons given less slides than configured in the setting', () => {
        const lessEntries = carouselEntries.slice(0, 2)

        createComponent({ slides: lessEntries })

        const buttons = wrapper.findAllComponents(Button)

        expect(buttons).toHaveLength(0)
      })

      test('should render next and no prev button given enough entries', () => {
        createComponent({ slides: carouselEntries }, false)

        const prev = wrapper.find('.slider__prev--hide')
        const next = wrapper.find('.slider__next--hide')

        expect(prev.exists()).toBeTruthy()
        expect(next.exists()).toBeFalsy()
      })
    })

    describe('homestage', () => {
      test('should render breakout wrapper and no content given homestage prop true', () => {
        createComponent({
          slides: carouselEntries,
          isHomeStage: true,
          ...propContent,
        })

        const content = wrapper.find('.carousel__content')

        expect(content.exists()).toBeFalsy()
      })

      test('should set content wrapper breakout given homestage', () => {
        createComponent({
          slides: carouselEntries,
          isHomeStage: true,
        })

        const contentWrapper = wrapper.findComponent(ContentWrapper)

        expect(contentWrapper.attributes('breakout')).toEqual('true')
        expect(contentWrapper.attributes('nopadding')).toEqual('true')
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
        expect(slider.attributes('autoplayspeed')).toBe('4000')
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

  describe('during interaction', () => {
    test('should render both buttons given an active slide unequal to first or last one', async () => {
      createComponent({ slides: carouselEntries }, false)

      const prev = wrapper.find('.slider__prev--hide')
      const next = wrapper.find('.slider__next--show')

      expect(prev.exists()).toBeTruthy()
      expect(next.exists()).toBeTruthy()

      const nextBtn = wrapper.findAllComponents(Button).at(1)
      await nextBtn.trigger('click')
      await wrapper.vm.$nextTick()

      const newPrev = wrapper.find('.slider__prev--show')
      const newNext = wrapper.find('.slider__next--show')
      expect(newPrev.exists()).toBeTruthy()
      expect(newNext.exists()).toBeTruthy()
    })

    test('should remove next button given last slide as active', () => {
      createComponent({
        slides: carouselEntries,
        initialSlide: carouselEntries.length - 1,
      })

      const next = wrapper.find('.slider__next--hide')

      expect(next.exists()).toBeTruthy()
    })
  })
})
