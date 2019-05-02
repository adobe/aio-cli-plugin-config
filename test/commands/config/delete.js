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

const TheCommand = require('../../../src/commands/config/delete.js')
const Config = require('@adobe/aio-cli-config/src/Config')

describe('delete', () => {
  afterEach(() => {
    Config.mockSet.mockReset()
  })

  test('flags', () => {
    expect(Object.keys(TheCommand.flags)).toEqual(['local', 'global', 'json', 'yaml'])
  })

  test('with delete key', () => {
    return TheCommand.run(['a-key']).then(() => {
      expect(Config.mockSet).toHaveBeenCalledWith('a-key', null, false)
    })
  })

  test('with local delete key', () => {
    return TheCommand.run(['-l', 'a-key']).then(() => {
      expect(Config.mockSet).toHaveBeenCalledWith('a-key', null, true)
    })
  })

  test('with multiple delete keys', () => {
    return TheCommand.run(['a-key1', 'a-key2', 'a-key3']).then(() => {
      expect(Config.mockSet).toHaveBeenNthCalledWith(1, 'a-key1', null, false)
      expect(Config.mockSet).toHaveBeenNthCalledWith(2, 'a-key2', null, false)
      expect(Config.mockSet).toHaveBeenNthCalledWith(3, 'a-key3', null, false)
    })
  })
})
