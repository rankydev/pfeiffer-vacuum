import getKey from './useUniqueKey'

describe('useUniqueKey', () => {
  test('get key without custom value', () => {
    const key = getKey()

    expect(key).toBeTruthy()
  })

  test('get key with custom value', () => {
    const customValue = 'lorem-ipsum'
    const key = getKey(customValue)

    expect(key).toContain(customValue)
  })
})
