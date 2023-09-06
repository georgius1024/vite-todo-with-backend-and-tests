import { describe, it, expect } from "vitest";

import testSubject from './todos'

describe('todos service', () => {
  it('imports without errors', () => {
    expect(testSubject).toBeDefined()
    expect(testSubject).toBeTypeOf('function')
  })
})