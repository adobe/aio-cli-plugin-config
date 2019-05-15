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

const TheCommand = require('../../../src/commands/config/clear.js')
const { mockSet } = require('@adobe/aio-cli-config/src/Config')

jest.mock('cli-ux')
const { cli } = require('cli-ux')

describe('clear', () => {
  afterEach(() => {
    mockSet.mockReset()
  })

  test('flags', () => {
    expect(Object.keys(TheCommand.flags)).toEqual(['local', 'global', 'json', 'yaml', 'force'])
  })

  test('default', () => {
    return TheCommand.run(['-f']).then(() => {
      expect(mockSet).toHaveBeenCalledWith(null, null, false)
    })
  })

  test('forced', () => {
    return TheCommand.run(['-fg']).then(() => {
      expect(mockSet).toHaveBeenCalledWith(null, null, false)
    })
  })

  test('forced and local', () => {
    return TheCommand.run(['-fl']).then(() => {
      expect(mockSet).toHaveBeenCalledWith(null, null, true)
    })
  })

  test('prompt with yes', () => {
    cli.prompt = jest.fn(() => 'y')
    return TheCommand.run([]).then(() => {
      expect(mockSet).toHaveBeenCalledWith(null, null, false)
    })
  })

  test('prompt with no', () => {
    cli.prompt = jest.fn(() => 'n')
    return TheCommand.run([]).then(() => {
      expect(mockSet).not.toHaveBeenCalled()
    })
  })
})
