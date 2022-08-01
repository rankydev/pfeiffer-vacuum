import { createLocalVue, shallowMount } from '@vue/test-utils'
import TopicRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'

const regions = ['testRegion']
const propsData = { type: 'SERVICE_REQUEST' }

const localVue = createLocalVue()
localVue.prototype.$nuxt = {
  context: {
    $hybrisApi: {
      countriesApi: {
        getRegions: jest.fn(() => {
          return regions
        }),
      },
    },
  },
}

describe('useRegion', () => {
  it('should return regions array when isocode is provided', async () => {
    const wrapper = shallowMount(TopicRequest, {
      propsData,
      localVue,
    })

    wrapper.setData({
      requestData: {
        contact: {
          address: {
            country: {
              isocode: 'US',
              name: 'United States of America',
            },
            region: {},
            town: '',
            postalCode: '',
            line1: '',
            line2: '',
            companyName: '',
          },
          firstName: '',
          lastName: '',
          email: '',
        },
        message: '',
        type: {
          code: 'SERVICE_REQUEST',
        },
      },
    })

    await wrapper.vm.getRegions()
    expect(wrapper.vm.regions).toBe(regions)
  })
  it('should return empty regions array when no isocode is provided', async () => {
    const wrapper = shallowMount(TopicRequest, {
      propsData,
      localVue,
    })

    wrapper.setData({
      requestData: {
        contact: {
          address: {
            country: {},
            region: {},
            town: '',
            postalCode: '',
            line1: '',
            line2: '',
            companyName: '',
          },
          firstName: '',
          lastName: '',
          email: '',
        },
        message: '',
        type: {
          code: 'SERVICE_REQUEST',
        },
      },
    })

    await wrapper.vm.getRegions()
    expect(wrapper.vm.regions).toStrictEqual([])
  })
})
