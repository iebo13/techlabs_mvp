/**
 * Browser API Mocks Test
 * Tests that browser API mocks are properly set up
 */

describe('Browser API Mocks Setup', () => {
  test('IntersectionObserver should be mocked globally', () => {
    expect(global.IntersectionObserver).toBeDefined()
    expect(typeof global.IntersectionObserver).toBe('function')
  })

  test('ResizeObserver should be mocked globally', () => {
    expect(global.ResizeObserver).toBeDefined()
    expect(typeof global.ResizeObserver).toBe('function')
  })

  test('window.matchMedia should be mocked', () => {
    expect(window.matchMedia).toBeDefined()
    expect(typeof window.matchMedia).toBe('function')
  })

  test('IntersectionObserver constructor should work', () => {
    const callback = jest.fn()
    const observer = new global.IntersectionObserver(callback)

    expect(observer).toBeDefined()
    expect(observer.observe).toBeDefined()
    expect(observer.unobserve).toBeDefined()
    expect(observer.disconnect).toBeDefined()

    expect(typeof observer.observe).toBe('function')
    expect(typeof observer.unobserve).toBe('function')
    expect(typeof observer.disconnect).toBe('function')
  })

  test('ResizeObserver constructor should work', () => {
    const callback = jest.fn()
    const observer = new global.ResizeObserver(callback)

    expect(observer).toBeDefined()
    expect(observer.observe).toBeDefined()
    expect(observer.unobserve).toBeDefined()
    expect(observer.disconnect).toBeDefined()

    expect(typeof observer.observe).toBe('function')
    expect(typeof observer.unobserve).toBe('function')
    expect(typeof observer.disconnect).toBe('function')
  })

  test('matchMedia should return proper object', () => {
    const result = window.matchMedia('(max-width: 768px)')

    expect(result).toBeDefined()
    expect(result).toHaveProperty('matches')
    expect(result).toHaveProperty('media')
    expect(result).toHaveProperty('addEventListener')
    expect(result).toHaveProperty('removeEventListener')
    expect(result).toHaveProperty('dispatchEvent')

    expect(typeof result.matches).toBe('boolean')
    expect(typeof result.media).toBe('string')
    expect(typeof result.addEventListener).toBe('function')
  })
})

export {}
