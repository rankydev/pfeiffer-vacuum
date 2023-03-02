import { shallowMount } from '@vue/test-utils'
import ResponsiveImage from './ResponsiveImage.vue'
import responsiveImageEntry from './ResponsiveImage.stories.content'
import { hybrisResponsiveImageEntry } from './ResponsiveImage.stories.content'

const nuxtImg = {
  template: '<div>some image</div>',
  props: ['src', 'modifiers', 'title', 'alt', 'provider'],
}

const defaultPropsStoryblok = () =>
  JSON.parse(JSON.stringify(responsiveImageEntry))
const defaultPropsHybris = () =>
  JSON.parse(JSON.stringify(hybrisResponsiveImageEntry))

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtImg: nuxtImg }

  const $img = () => ''
  const mocks = {
    $nuxt: {
      context: { $img },
    },
  }

  const options = {
    mocks,
    stubs,
    propsData,
  }

  wrapper = shallowMount(ResponsiveImage, options)
}

const aspectRatioArr = [
  ['1:1', 'responsive-image__1-1'],
  ['16:9', 'responsive-image__16-9'],
  ['2:3', 'responsive-image__2-3'],
  ['3:2', 'responsive-image__3-2'],
  ['3:1', 'responsive-image__3-1'],
  ['21:28', 'responsive-image__21-28'],
]

describe('ResponsiveImage', () => {
  describe('initial state', () => {
    describe('given no provider', () => {
      test('should render responsive image when no data is provided', () => {
        createComponent()
        const ResponsiveImageWrapper = wrapper.find(
          '.responsive-image__placeholder'
        )
        expect(ResponsiveImageWrapper.exists()).toBeTruthy()
      })
    })

    describe('given provider storyblok', () => {
      test('should have gradient given gradient=true', () => {
        const propsData = {
          ...defaultPropsStoryblok(),
          withGradient: true,
        }
        createComponent(propsData)

        expect(
          wrapper.find('.responsive-image__gradient-overlay').exists()
        ).toBeTruthy()
      })

      test.each(aspectRatioArr)(
        'should render placeholder with matching aspect-ratio-classes based on selected aspect ratio, when no image is provided',
        (input, output) => {
          const propsData = {
            ...defaultPropsStoryblok(),
            image: undefined,
            aspectRatio: input,
          }
          createComponent(propsData)

          const placeholderWrapper = wrapper.find(
            '.responsive-image__placeholder'
          )
          expect(placeholderWrapper.exists()).toBeTruthy()
          expect(placeholderWrapper.attributes('class')).toMatch(output)
        }
      )

      test('should add rounded class given rounded=true', () => {
        const propsData = {
          ...defaultPropsStoryblok(),
          rounded: true,
        }
        createComponent(propsData)

        const picture = wrapper.find('.responsive-image')

        expect(picture.attributes('class')).toMatch('responsive-image__rounded')
      })

      test('should not add rounded class given rounded=false', () => {
        const propsData = {
          ...defaultPropsStoryblok(),
          rounded: false,
        }
        createComponent(propsData)

        const picture = wrapper.find('.responsive-image')

        expect(picture.attributes('class')).not.toMatch(
          'responsive-image__rounded'
        )
      })

      test('should have greyscale given greyscale=true', () => {
        const propsData = {
          ...defaultPropsStoryblok(),
          blackAndWhite: true,
        }
        createComponent(propsData)
        const ResponsiveImageWrapper = wrapper.findComponent(nuxtImg)
        expect(ResponsiveImageWrapper.vm.modifiers.filters).toEqual({
          focal: null,
          grayscale: '',
        })
      })

      test('should have no greyscale given greyscale=false', () => {
        const propsData = {
          ...defaultPropsStoryblok(),
        }
        createComponent(propsData)
        const ResponsiveImageWrapper = wrapper.findComponent(nuxtImg)
        expect(ResponsiveImageWrapper.vm.modifiers.filters).toEqual({
          focal: null,
          grayscale: false,
        })
      })
    })
  })

  describe.each([
    ['storyblok', defaultPropsStoryblok()],
    ['hybris', defaultPropsHybris()],
  ])('given provider %s', (provider, props) => {
    test('should render a responsive image ', () => {
      const propsData = {
        ...props,
      }
      createComponent(propsData)

      const ResponsiveImageWrapper = wrapper.findComponent(nuxtImg)

      expect(ResponsiveImageWrapper.vm.src).toEqual(
        propsData.image.originalFilename || propsData.image.url
      )
    })

    test('should have matching provider', () => {
      const propsData = {
        ...props,
      }
      createComponent(propsData)
      const ResponsiveImageWrapper = wrapper.findComponent(nuxtImg)
      expect(ResponsiveImageWrapper.vm.provider).toEqual(propsData.provider)
    })
  })
})
