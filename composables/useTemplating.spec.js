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
          quicklinks: [
            {
              id: '3',
            },
          ],
          stage: [
            {
              id: '4',
            },
          ],
          body: [
            {
              id: '5',
            },
          ],
          bottom: [
            {
              id: '6',
            },
          ],
          footer: [
            {
              id: '7',
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
    expect(overwrittenContent.quicklinks.value).toHaveLength(1)
    expect(overwrittenContent.quicklinks.value[0].id).toBe('3')
    expect(overwrittenContent.stage.value).toHaveLength(1)
    expect(overwrittenContent.stage.value[0].id).toBe('4')
    expect(overwrittenContent.body.value).toHaveLength(1)
    expect(overwrittenContent.body.value[0].id).toBe('5')
    expect(overwrittenContent.bottom.value).toHaveLength(1)
    expect(overwrittenContent.bottom.value[0].id).toBe('6')
    expect(overwrittenContent.footer.value).toHaveLength(1)
    expect(overwrittenContent.footer.value[0].id).toBe('7')
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
