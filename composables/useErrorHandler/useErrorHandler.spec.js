import { describe, it, test } from '@jest/globals'
import { useErrorHandler } from './index.js'

describe('useErrorHandler', () => {
  describe('initial state', () => {
    test('should return redirectOnError on error function')
    test('should register onBeforeMount hook')
  })

  describe('during interaction', () => {
    describe('given process.server false', () => {
      test('should call conext.error when cb fails')
      test('should not call cntext.error if cb succeeds')
    })

    describe('given process.server true', () => {
      test('should set hasError to true if cb fails')
      test('should not set hasError to true if cb fails')
    })

    describe('given a failing cb', () => {
      it('should call context.error when onBeforeMount was called')
    })

    describe('given an succeeding cb', () => {
      it('should call context.error when onBeforeMount was called')
    })
  })

  // describe('business requirements', () => {})
})
