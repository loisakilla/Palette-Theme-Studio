import { describe, expect, it } from 'vitest'
import { buildCssVariables, buildJson, rgbToHex } from './palette'

describe('palette utils', () => {
  it('converts rgb to hex', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
  })

  it('builds css variables', () => {
    const css = buildCssVariables(['#111111', '#222222'])
    expect(css).toContain('--color-1: #111111')
    expect(css).toContain('--color-2: #222222')
  })

  it('builds json', () => {
    const json = buildJson(['#fff'])
    expect(json).toContain('color-1')
  })
})

