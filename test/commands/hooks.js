/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const Hooks = require('../../src/hooks.js')
const hooks = Hooks.bind({ debug: () => true })
const conf = require('@adobe/aio-lib-core-config')

let mockGet = jest.fn()
let mockDelete = jest.fn()
let mockSet = jest.fn()
let mockClear = jest.fn()
let mockStore = jest.fn()

jest.mock('conf', () => {
  return jest.fn().mockImplementation(() => {
    return {
      get: mockGet,
      delete: mockDelete,
      set: mockSet,
      clear: mockClear,
      store: mockStore
    }
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('hooks', () => {
  test('should export a function', () => {
    expect(typeof hooks).toBe('function')
  })

  test('should not set if no conf', () => {
    mockStore = {}
    return hooks().then(() => {
      expect(conf.set).not.toHaveBeenCalled()
      expect(mockSet).not.toHaveBeenCalled()
      expect(mockClear).not.toHaveBeenCalled()
    })
  })

  test('should upgrade if it is set with object', () => {
    mockStore = { 'foo': 'bar' }
    return hooks().then(() => {
      expect(conf.set).toHaveBeenCalledWith(null, { 'foo': 'bar' })
      expect(mockSet).toHaveBeenCalledWith('__backup__', { 'foo': 'bar' })
      expect(mockClear).toHaveBeenCalled()
    })
  })

  test('should upgrade with json', () => {
    mockStore = { 'jwt-auth': { a: 12 } }
    return hooks().then(() => {
      expect(mockClear).toHaveBeenCalled()
      expect(conf.set).toHaveBeenCalledWith(null, { 'jwt-auth': { a: 12 } })
      expect(mockSet).toHaveBeenCalledWith('__backup__', { 'jwt-auth': { a: 12 } })
    })
  })

  // also invalid json
  test('should upgrade with json-string', () => {
    mockStore = '{"jwt-auth": { "a": 12 }}'
    return hooks().then(() => {
      expect(mockClear).toHaveBeenCalled()
      expect(conf.set).toHaveBeenCalledWith(null, { 'jwt-auth': { a: 12 } })
      expect(mockSet).toHaveBeenCalledWith('__backup__', '{"jwt-auth": { "a": 12 }}')
    })
  })

  test('should not fail if empty store', () => {
    mockStore = null
    return hooks().then(() => {
      expect(mockClear).not.toHaveBeenCalled()
      expect(conf.set).not.toHaveBeenCalled()
      expect(mockSet).not.toHaveBeenCalled()
    })
  })

  test('should not backup if old.backup exists', () => {
    mockStore = { '__backup__': { 'name': 'old backup' } }
    return hooks().then(() => {
      expect(mockClear).not.toHaveBeenCalled()
      expect(conf.set).not.toHaveBeenCalled()
      expect(mockSet).not.toHaveBeenCalled()
    })
  })

  test('should not fail if bad json', () => {
    mockStore = '{"jwt-auth":badjson}{}'
    return hooks().then(() => {
      expect(mockClear).toHaveBeenCalled()
      expect(conf.set).not.toHaveBeenCalled()
      expect(mockSet).toHaveBeenCalledWith('__backup__', mockStore)
    })
  })
})
