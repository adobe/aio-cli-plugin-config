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
const conf = require('@adobe/aio-cli-config')

let mockGet = jest.fn()
let mockDelete = jest.fn()
let mockSet = jest.fn()
jest.mock('conf', () => {
  return jest.fn().mockImplementation(() => {
    return { get: mockGet, delete: mockDelete, set: mockSet }
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('hooks', () => {
  test('should export a function', () => {
    expect(typeof hooks).toBe('function')
  })

  test('should call dotenv', () => {
    return hooks().then(() => {
      expect(conf.dotenv).toHaveBeenCalled()
    })
  })

  test('should not set if no conf', () => {
    return hooks().then(() => {
      expect(mockGet).toHaveBeenCalledWith('jwt-auth')
      expect(conf.set).not.toHaveBeenCalled()
      expect(mockSet).not.toHaveBeenCalled()
      expect(mockDelete).toHaveBeenCalledWith('jwt-auth')
    })
  })

  test('should upgrade if it is set with object', () => {
    mockGet.mockImplementation(() => { return { foo: 'bar' } })
    return hooks().then(() => {
      expect(mockGet).toHaveBeenCalledWith('jwt-auth')
      expect(conf.set).toHaveBeenCalledWith('jwt-auth', { 'foo': 'bar' })
      expect(mockSet).toHaveBeenCalledWith('jwt-auth-backup', { 'foo': 'bar' })
      expect(mockDelete).toHaveBeenCalledWith('jwt-auth')
    })
  })

  test('should upgrade with json', () => {
    mockGet.mockImplementation(() => { return '{ "a": 12 }' })
    return hooks().then(() => {
      expect(mockGet).toHaveBeenCalledWith('jwt-auth')
      expect(conf.set).toHaveBeenCalledWith('jwt-auth', { a: 12 })
      expect(mockSet).toHaveBeenCalledWith('jwt-auth-backup', '{ "a": 12 }')
      expect(mockDelete).toHaveBeenCalledWith('jwt-auth')
    })
  })

  test('should not fail if bad json', () => {
    mockGet.mockImplementation(() => { return 'badjson}{' })
    return hooks().then(() => {
      expect(mockGet).toHaveBeenCalledWith('jwt-auth')
      expect(conf.set).not.toHaveBeenCalled()
      expect(mockSet).toHaveBeenCalledWith('jwt-auth-backup', 'badjson}{')
      expect(mockDelete).toHaveBeenCalledWith('jwt-auth')
    })
  })
})
