import { renderComponent } from '../../renderHelper'
import Card from '@/components/common/Card/Card.vue'

const props = { to: 'some url' }

describe('Card', () => {
  test('should render given the minimal setup', () => {
    const wrapper = renderComponent(Card, props)

    expect(wrapper.vm).toBeTruthy()
  })

  test('should render all content given slot content', () => {
    const tag = '<tag />'
    const image = '<image />'
    const subheading = '<subheading />'
    const heading = '<heading />'
    const tags = '<tags />'
    const description = '<description />'
    const scopedSlots = { tag, image, subheading, heading, tags, description }
    const wrapper = renderComponent(Card, props, false, { scopedSlots })

    expect(wrapper.find('tag')).toBeTruthy()
    expect(wrapper.find('image')).toBeTruthy()
    expect(wrapper.find('subheading')).toBeTruthy()
    expect(wrapper.find('heading')).toBeTruthy()
    expect(wrapper.find('tags')).toBeTruthy()
    expect(wrapper.find('description')).toBeTruthy()
  })
})
