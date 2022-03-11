import useTemplating from './useTemplating.js'
import { ref } from '@nuxtjs/composition-api'

describe('useTemplating ', () => {
  it('should return template content', () => {
    const content = {
      template: {
        content: {
          top: [
            {
              id: '1',
            },
          ],
          header: [
            {
              id: '2',
            },
          ],
          stage: [
            {
              id: '3',
            },
          ],
          body: [
            {
              id: '4',
            },
          ],
          bottom: [
            {
              id: '5',
            },
          ],
          footer: [
            {
              id: '6',
            },
          ],
        },
      },
    }
    const overwrittenContent = useTemplating(ref(content))
    expect(overwrittenContent.top.value).toHaveLength(1)
    expect(overwrittenContent.top.value[0].id).toBe('1')
    expect(overwrittenContent.header.value).toHaveLength(1)
    expect(overwrittenContent.header.value[0].id).toBe('2')
    expect(overwrittenContent.stage.value).toHaveLength(1)
    expect(overwrittenContent.stage.value[0].id).toBe('3')
    expect(overwrittenContent.body.value).toHaveLength(1)
    expect(overwrittenContent.body.value[0].id).toBe('4')
    expect(overwrittenContent.bottom.value).toHaveLength(1)
    expect(overwrittenContent.bottom.value[0].id).toBe('5')
    expect(overwrittenContent.footer.value).toHaveLength(1)
    expect(overwrittenContent.footer.value[0].id).toBe('6')
  })

  it('should return custom content over template content', () => {
    const content = {
      top: [
        {
          id: '1-custom',
        },
      ],
      template: {
        content: {
          top: [
            {
              id: '1-template',
            },
          ],
        },
      },
    }
    const overwrittenContent = useTemplating(ref(content))
    expect(overwrittenContent.top.value).toHaveLength(1)
    expect(overwrittenContent.top.value[0].id).toBe('1-custom')
  })
})
