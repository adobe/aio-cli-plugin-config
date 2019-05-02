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

const { stdout } = require('stdout-stderr')
const TheCommand = require('../../../src/commands/config/get.js')
const { mockGet } = require('@adobe/aio-cli-config/src/Config')

describe('get', () => {
  afterEach(() => {
    mockGet.mockClear()
  })

  test('flags', () => {
    expect(Object.keys(TheCommand.flags)).toEqual(['local', 'global', 'json', 'yaml', 'env'])
  })

  test('default', () => {
    return TheCommand.run(['a-key']).then(() => {
      expect(mockGet).toHaveBeenCalledWith('a-key', undefined)
    })
  })

  test('env', () => {
    return TheCommand.run(['-e', 'a-key']).then(() => {
      expect(mockGet).toHaveBeenCalledWith('a-key', 'env')
    })
  })

  test('local', () => {
    return TheCommand.run(['-l', 'a-key']).then(() => {
      expect(mockGet).toHaveBeenCalledWith('a-key', 'local')
    })
  })

  test('global', () => {
    return TheCommand.run(['-g', 'a-key']).then(() => {
      expect(mockGet).toHaveBeenCalledWith('a-key', 'global')
    })
  })

  test('empty key', () => {
    mockGet.mockImplementation(() => { return null })
    return TheCommand.run(['a-key']).then(() => {
      expect(mockGet).toHaveBeenCalledWith('a-key', undefined)
      expect(stdout.output).toEqual('')
    })
  })

  test('empty object', () => {
    mockGet.mockImplementation(() => { return {} })
    return TheCommand.run(['a-key']).then(() => {
      expect(mockGet).toHaveBeenCalledWith('a-key', undefined)
      expect(stdout.output).toEqual('')
    })
  })

  test('should print object', () => {
    mockGet.mockImplementation(() => { return { a: 12 } })
    return TheCommand.run(['a-key']).then(() => {
      expect(mockGet).toHaveBeenCalledWith('a-key', undefined)
      expect(stdout.output).toMatch(/a: 12/)
    })
  })
})
